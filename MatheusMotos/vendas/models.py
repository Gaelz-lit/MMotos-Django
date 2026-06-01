from django.db import models
from django.urls import reverse
from django.core.validators import MinValueValidator

#oq vai ser vendido

class produto (models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField(blank=True, null=True)
    valor = models.DecimalField(max_digits=10,decimal_places=2)
    quantidade = models.PositiveIntegerField(validators=[MinValueValidator(1)],default=1)
    marca = models.CharField(max_length=50)
    disponivel = models.BooleanField('Disponivel', default =True)

    class Meta:
        verbose_name = 'produto'
        verbose_name_plural = 'produto'
        ordering =  ['nome']

    def __str__(self):
        return self.nome

class servico (models.Model):
    nome = models.CharField(max_length=50)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField(blank=True, null=True)
    quantidade = models.PositiveIntegerField(validators=[MinValueValidator(1)],default=1)
    disponivel = models.BooleanField('Disponivel', default =True)
    duracao = models.DurationField()

    class Meta:
        verbose_name = 'servico'
        verbose_name_plural = 'servico'
        ordering =  ['nome']

    def __str__(self):
        return self.nome

class historico (models.Model):
    nome = models.CharField(max_length=50)
    valortotal = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'historico'
        verbose_name_plural = 'historico'
        ordering =  ['nome']

    def __str__(self):
        return self.nome

