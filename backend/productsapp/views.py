from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Prefetch
from django.core.mail import send_mail
from django.conf import settings
from .models import Category, Product, Contact
from .serializers import CategorySerializer, ProductSerializer, ProductListSerializer, ContactSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing categories.
    Public access - no authentication required.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Get all products for a specific category"""
        category = self.get_object()
        products = category.products.all()
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing products.
    Public access - no authentication required.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured products"""
        featured_products = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get all products grouped by category"""
        categories = Category.objects.prefetch_related(
            Prefetch('products', queryset=Product.objects.all())
        ).all()
        
        result = []
        for category in categories:
            category_data = CategorySerializer(category, context={'request': request}).data
            products = category.products.all()
            products_data = ProductListSerializer(products, many=True, context={'request': request}).data
            category_data['products'] = products_data
            result.append(category_data)
        
        return Response(result)

class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling contact form submissions.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['post']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            
            # Send email notification
            try:
                subject = f"New Contact Message from {contact.name}"
                message = f"""
                You have received a new contact message
                from your products website:
                
                Name: {contact.name}
                Email: {contact.email}
                Message: {contact.message}
                
                Received at: {contact.created_at}
                """
                
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL], 
                    fail_silently=False,
                )
                
                # Also send confirmation email to the user
                user_subject = "Thank you for your message!"
                user_message = f"""
                Hi {contact.name},
                
                Thank you for reaching out to us! 
                We'll get back to you as soon as possible.
                
                Best regards,
                Products Team
                """
                
                send_mail(
                    user_subject,
                    user_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [contact.email],
                    fail_silently=False,
                )
                
            except Exception as e:
                print(f"Email sending failed: {e}")
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)