from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class CadastroForm(UserCreationForm):
    username = forms.CharField(required=True,
        label = 'Nome de Usuário',
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Digite o seu nome de usuário...'
            }
        )
    )

    email = forms.EmailField(required=True,
        label = 'Email',
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'Digite seu email...'
            }
        )
    )

    password1 = forms.CharField(required=True,
        label = 'Senha',
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Digite sua senha...'
            }
        )
    )

    password2 = forms.CharField(required=True,
        label = 'Confirmar Senha',
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Repita a sua senha...'
            }
        )
    )

    class Meta:
        model = User
        fields = ['username','email','password1','password2']
    pass

