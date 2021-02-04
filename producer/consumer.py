import django
import json
import os
import pika

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "producer.settings")
django.setup()

from products.models import Product

params = pika.URLParameters("amqps://wzktcftn:AKPRheLZ14arsMYL_bgtaVdipmIUR1hn@orangutan.rmq.cloudamqp.com/wzktcftn")

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    print('Received in admin queue.')
    pid = json.loads(body)
    print(pid)
    product = Product.objects.get(id=pid)
    product.likes += 1
    product.save()
    print('Product liked')


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print('Started consuming...')

channel.start_consuming()

channel.close()
