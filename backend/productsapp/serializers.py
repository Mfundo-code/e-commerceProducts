from rest_framework import serializers
from .models import Category, Product, Contact

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'product_count']
    
    def get_product_count(self, obj):
        return obj.products.count()

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'description', 'category', 'category_name', 
            'product_image', 'price', 'featured', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'description', 'category_name', 'product_image', 
            'price', 'featured', 'created_at'
        ]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read']