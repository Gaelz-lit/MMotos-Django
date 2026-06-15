from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import CadastroForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout

def cadastro(request):
    if request.method == 'POST':
        form = CadastroForm(request.POST)

        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Cadastro realizado com sucesso!')
            return redirect('vendas')
        
    else:
        form = CadastroForm()
        
    return render(request, 'paginas/cadastro.html', {'form': form})

# usuarios/views.py
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)

            next_url = request.GET.get('next')

            if next_url:
                return redirect(next_url)
            return redirect('vendas')
        else:
            return render(request, 'paginas/login.html', {'erro': 'Usuário ou senha incorretos.'})
    return render(request, 'paginas/login.html')

def logout_view(request):
    if request.method == 'POST':    
        logout(request)
        messages.success(request, 'Você saiu da sua conta.')

    return redirect('login')

def redefinir_senha(request):
    return render(request, 'paginas/fsenha.html')
