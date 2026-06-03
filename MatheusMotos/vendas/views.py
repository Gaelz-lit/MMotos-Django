from django.shortcuts import render
from django.http import HttpResponse
from .models import produto
# Create your views here.


#def home(request):
 #return HttpResponse('texto que vc queira que apareça na tela')

#tu, gael
def vendas(request):
    produtos = produto.objects.all()

    return render(request, 'paginas/index.html', {'produtos': produtos})

def carrinho(request):
    return render(request, 'paginas/carrinho.html')

def servicos(request):
    return render(request, 'paginas/servicos.html')

def produtos(request):
    return render(request, 'paginas/produtos.html')

#eu, jacke
