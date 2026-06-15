from django.conf import settings
from django.conf.urls.static import static
#from django.conf import settings
from django.contrib import admin
from django.urls import path,include

admin.site.site_header = 'MMotos - Administração'
admin.site.site_title = 'MMotos - Admin'
admin.site.index_title = 'Bem-vindo ao painel de administração da MMotos'


urlpatterns = [
     #path('', include('vendas.urls')),
    path('admin/', admin.site.urls),
    path('',include('vendas.urls')),
    path('', include('usuarios.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
