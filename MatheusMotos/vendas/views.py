from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import produto, servico, historicos, agendamento
from django.contrib.auth.decorators import login_required
import json


def vendas(request):
    produtos = produto.objects.all()[:4]
    servicos = servico.objects.all()[:3]
    return render(request, 'paginas/index.html', {'produtos': produtos, 'servicos': servicos})


@login_required
def carrinho(request):
    return render(request, 'paginas/carrinho.html')


def servicos(request):
    servicos = servico.objects.all()
    return render(request, 'paginas/servicos.html', {'servicos': servicos})


def produtos(request):
    produtos = produto.objects.all()
    return render(request, 'paginas/produtos.html', {'produtos': produtos})


@login_required
def confirmar_reserva(request):
    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    servico_id = request.POST.get('servico_id')
    data_agendada = request.POST.get('data_agendada')

    # Valida campos obrigatórios
    if not servico_id or not data_agendada:
        return JsonResponse({'erro': 'Dados incompletos'}, status=400)

    # Verifica se o usuário tem perfil (cliente) vinculado
    if not hasattr(request.user, 'perfil'):
        return JsonResponse(
            {'erro': 'Seu usuário não tem um perfil de cliente cadastrado. Fale com o administrador.'},
            status=400
        )

    servico_escolhido = get_object_or_404(servico, id=servico_id)
    cliente_logado = request.user.perfil

    agendamento.objects.create(
        cliente=cliente_logado,
        servico=servico_escolhido,
        data_agendada=data_agendada,
        status='P'
    )

    return JsonResponse({'sucesso': True, 'mensagem': f'Reserva de "{servico_escolhido.nome}" confirmada!'})