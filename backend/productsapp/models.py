from django.db import models
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('admin:productsapp_category_change', args=[self.id])

class Product(models.Model):
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')  # Fixed this line
    product_image = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Product Price")
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Product {self.id} - {self.category.name} - {self.description[:50]}..."
    
    def get_absolute_url(self):
        return reverse('admin:productsapp_product_change', args=[self.id])

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"Message from {self.name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"