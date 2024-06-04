from django.shortcuts import render
from django.http import JsonResponse

def gerRoutes (request):
    routes = [
        "api/token/",
        "api/token/refresh/",
    ]
    return JsonResponse(routes, safe=False)
