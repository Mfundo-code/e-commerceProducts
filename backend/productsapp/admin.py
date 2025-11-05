from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id', 
        'category', 
        'featured', 
        'price',
        'created_at', 
        'product_image_preview',
    ]
    list_filter = ['category', 'featured', 'created_at']
    search_fields = ['description']
    list_editable = ['featured', 'price']
    list_display_links = ['id', 'category']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('category', 'featured', 'price', 'created_at', 'updated_at')
        }),
        ('Content', {
            'fields': ('description', 'product_image', 'product_image_preview')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'product_image_preview']
    
    def product_image_preview(self, obj):
        if obj.product_image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.product_image.url
            )
        return "No image"
    product_image_preview.short_description = 'Image Preview'