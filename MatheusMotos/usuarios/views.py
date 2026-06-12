from django.shortcuts import render, redirect
from .forms import CadastroForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login

# Create your views here.
def cadastro(request):
    if request.method == 'POST':
        form = CadastroForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('login')
        
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
            return redirect('vendas')
        else:
            return render(request, 'paginas/login.html', {'erro': 'Usuário ou senha incorretos.'})
    return render(request, 'paginas/login.html')

def logout_view(request):
    return render(request, 'logout.html')
