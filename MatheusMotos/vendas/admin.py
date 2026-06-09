from django.contrib import admin
# Register your models here.

from .models import produto, servico, categoria, agendamento


@admin.register(agendamento)
class agendamentoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'servico', 'data_hora', 'status')
    list_filter = ('status', 'data_hora')
    search_filds = ('cliente__nome', 'servico__nome',)
    ordering = ('data_hora',)

    #actions = ['finalizar_servico']

    




@admin.register(categoria)
class categoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)


@admin.register(produto)
class produtoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','marca','disponivel','categoria',)
    search_fields = ('nome','descricao', 'marca',)
    list_filter = ('categoria',)


    
@admin.register(servico)
class servicoAdmin(admin.ModelAdmin):
    list_display = ('nome','descricao','valor','quantidade','disponivel','duracao',)
    search_fields = ('nome','descricao',)
    

    