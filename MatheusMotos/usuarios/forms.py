from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class CadastroForm(UserCreationForm):
    username = forms.CharField(required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Nome de usuário'
            }
        )
    )

    email = forms.EmailField(required=True,
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'E-mail'
            }
        )
    )

    password1 = forms.CharField(required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Senha'
            }
        )
    )

    password2 = forms.CharField(required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Confirmar Senha'
            }
        )
    )

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2'
        ]
    pass

