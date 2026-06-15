from django.urls import path
from . import views
# o ponto é pra dizer que é do mesmo lugar , ou seja, o views é da mesma pasta que eu to agr (vendas)

urlpatterns = [

    #path('', views.home, name='home'),
    path('', views.vendas, name='vendas'),

    path('carrinho/', views.carrinho, name='carrinho'),
    path('servicos/', views.servicos, name='servicos'),
    path('produtos/', views.produtos, name='produtos'),

    path('confirmar-reserva/', views.confirmar_reserva, name='confirmar_reserva'),


]

"""path('confirmar-reserva/', views.confirmar_reserva, name='confirmar_reserva'),"""
