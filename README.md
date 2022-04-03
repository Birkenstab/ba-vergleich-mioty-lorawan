# Vergleich der LPWANs Mioty und LoRaWAN
Digitaler Anhang meiner Bachelorthesis von April 2022 an der Technischen Hochschule Ulm im Studiengang Informatik in Zusammenarbeit mit eXXcellent Solutions
## [Link zur schriftlichen Ausarbeitung](https://brk.st/ba)
[<img src=".github/titlepage_thumb.svg" width="600">](https://brk.st/ba)

## Beschreibung
Siehe Anhang der [schriftlichen Ausarbeitung](https://brk.st/ba)

## Testaufbau Mioty
Benötigt das Diehl Mioty Premium Gateway, Mioty-Clients und Docker-Compose

Dieser Aufbau dekodiert mithilfe des Node-RED-Programms den Payload der Mioty-Clients und sendet ihn wieder als als MQTT-Nachricht zurück.

Zum Starten des Mioty-Testaufbaus mit Mosquitto und NodeRed:

* Im Ordner "Mosquitto": `docker-compose up`
* Im Ordner "Node-Red": `docker-compose up`
* Im Mioty-Gateway kann man jetzt den MQTT-Server hinzufügen (Port 1883). Benutzername und Passwort kann freigelassen werden, denn der Mosquitto erlaubt in dieser Konfiguration anonyme Verbindungen
* Auf http://localhost:1880 kann auf das Node-RED zugegriffen werden
* Mit einem MQTT-Client wie z. B. MQTT Explorer kann man sich zu dem eben gestarteten Mosquitto-Server verbinden. Dort sieht man dann die rohen Nachrichten vom Gateway, sowie die dekodierten Nachricht in JSON-Form von Node-RED
