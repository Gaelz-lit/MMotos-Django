from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


#def home(request):
 #return HttpResponse('texto que vc queira que apareça na tela')

#tu, gael
def vendas(request):
    return render(request, 'paginas/index.html')

def carrinho(request):
    return render(request, 'paginas/carrinho.html')

def servicos(request):
    return render(request, 'paginas/servicos.html')

def produtos(request):
    return render(request, 'paginas/produtos.html')

#eu, jacke
