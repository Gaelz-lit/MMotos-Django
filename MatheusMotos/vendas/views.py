from django.shortcuts import render
from django.http import HttpResponse
from .models import produto, servico, historicos


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

#DASHBOARD
"""def dashboard(request):

   faturamento = Historico.objects.aggregate(total=Sum('valortotal'))['total'] or 0
   total_clientes = Cliente.objects.count()
   total_servicos = Servico.objects.count()

context = {
        'total_clientes': total_clientes,
        'total_servicos': total_servicos,
        'faturamento': faturamento,
    }

    return render(request, 'paginas/dashboard.html', context)"""

