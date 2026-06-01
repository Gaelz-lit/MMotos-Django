from django.contrib import admin
# Register your models here.

from .models import produto, servico

@admin.register(produto)
class produtoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','marca','disponivel',)
    search_fields = ('nome','descricao', 'marca',)


    
@admin.register(servico)
class servicoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','disponivel','duracao',)
    search_fields = ('nome','descricao',)
    

    