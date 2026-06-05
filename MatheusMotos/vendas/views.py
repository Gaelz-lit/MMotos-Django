from django.shortcuts import render
from django.http import HttpResponse
from .models import produto, servico
# Create your views here.


#def home(request):
 #return HttpResponse('texto que vc queira que apareça na tela')

#tu, gael
def vendas(request):
    produtos = produto.objects.all()
    servicos = servico.objects.all()

    return render(request, 'paginas/index.html', {'produtos': produtos, 'servicos': servicos})

def carrinho(request):
    return render(request, 'paginas/carrinho.html')

def servicos(request):
    servicos = servico.objects.all()

    return render(request, 'paginas/servicos.html', {'servicos': servicos})

def produtos(request):
    produtos = produto.objects.all()

    return render(request, 'paginas/produtos.html', {'produtos': produtos})

#eu, jacke
