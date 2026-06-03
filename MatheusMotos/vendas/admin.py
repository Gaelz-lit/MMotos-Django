from django.contrib import admin
# Register your models here.

from .models import produto, servico

@admin.register(produto)
class produtoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','marca','disponivel','categoria',)
    search_fields = ('nome','descricao', 'marca',)
    list_filter = ('categoria',)


    
@admin.register(servico)
class servicoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','disponivel','duracao','categoria',)
    search_fields = ('nome','descricao',)
    list_filter = ('categoria',)
    

    