from django.db import models
from django.urls import reverse
from django.core.validators import MinValueValidator
from datetime import timedelta


class categoria(models.Model):
    nome = models.CharField(max_length=100, unique=True)


    class Meta:
        verbose_name = 'categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['nome']

    def __str__(self):
        return self.nome

class produto (models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField(blank=True, null=True)
    valor = models.DecimalField(max_digits=10,decimal_places=2)
    quantidade = models.PositiveIntegerField(validators=[MinValueValidator(1)],default=1)
    marca = models.CharField(max_length=50)
    imagem = models.ImageField('foto', upload_to='fotos/', blank=True, null=True)
    disponivel = models.BooleanField('Disponivel', default =True)

# RELACIONAMENTOS 

    categoria = models.ForeignKey(
        categoria,
        on_delete=models.PROTECT,
        related_name='produtos',
        verbose_name='Categoria',
    ) 


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
    imagem = models.ImageField('foto', upload_to='fotos/', blank=True, null=True)
    disponivel = models.BooleanField('Disponivel', default =True)
    duracao = models.DurationField(default = timedelta(hours=1))

    class Meta:
        verbose_name = 'servico'
        verbose_name_plural = 'servico'
        ordering =  ['nome']

    def __str__(self):
        return self.nome 
    
class cliente (models.Model):
    nome = models.CharField(max_length=50)
    #telefone = models.CharFild(max_length=11)
    cpf = models.CharField(max_length=11, unique=True, primary_key=True)

    class Meta: 
        verbose_name = 'cliente'
        verbose_name_plural = 'cliente'
        ordering =  ['nome']

    def __str__(self):
        return self.nome
    
class agendamento (models.Model):
    data_hora = models.DateTimeField(verbose_name='Data e Hora do Agendamento')

    STATUS_CHOICES = [
        ('P', 'Pendente'),
        ('C', 'Confirmado'),
        ('F', 'Finalizado'),
        ('X', 'Cancelado'),
    ]

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    observacoes = models.TextField(blank=True, null=True)


    #RELACIONAMENTOS 

    cliente = models.ForeignKey(
        'cliente',
        on_delete=models.PROTECT,
        related_name='agendamentos',
        verbose_name='Cliente'

    )

    servico = models.ForeignKey(
        'servico',
        on_delete=models.PROTECT,
        related_name='agendamentos',
        verbose_name='Serviço'
    )


    class Meta: 
        verbose_name = 'agendamento'
        verbose_name_plural = 'agendamento'
        ordering =  ['data_hora']

    def __str__(self):
        return f'{self.cliente} - {self.servico}'



#historico representa tbm a NF 
class historicos (models.Model):
    nome = models.CharField(max_length=50)
    valortotal = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateTimeField(auto_now_add=True)

    
    servico = models.ManyToManyField(
        'servico',
        related_name='historicos',
        verbose_name='Serviços',
    )

    
    produto= models.ManyToManyField(
        'produto',
        related_name='historicos',
        verbose_name='Produtos',
    )
    
    cliente= models.ForeignKey(
        'cliente',
        on_delete=models.PROTECT,
        related_name='historicos',
        verbose_name='Cliente',
    )


    class Meta:
        verbose_name = 'historicos'
        verbose_name_plural = 'historicos'
        ordering =  ['nome']

    def __str__(self):
        return self.nome

