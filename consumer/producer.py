import json

import pika

params = pika.URLParameters("amqps://wzktcftn:AKPRheLZ14arsMYL_bgtaVdipmIUR1hn@orangutan.rmq.cloudamqp.com/wzktcftn")

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body), properties=properties)

