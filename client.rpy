
cache()

import sys

from txsockjs.factory import SockJSResource
from twisted.protocols.basic import LineReceiver
from twisted.internet.protocol import Factory

hub = []

class ClientConnection(LineReceiver):
    def connectionMade(self):
        hub.append(self)

    def lineReceived(self, line):
        for connection in hub:
            if connection is not self:
                connection.sendLine(line)

    def connectionLost(self, reason):
        hub.remove(self)



resource = SockJSResource(Factory.forProtocol(ClientConnection))
