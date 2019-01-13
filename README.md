![Nors](logo.png)  
  
**N**otový **OR**ganový **S**oftvér

Softvér pre digitálne zobrazovanie liturgickej a hudobnej literatúry pre organistov. 

#### Technické info
Nors je program vyvíjaný ako Open Source webová aplikácia pod MIT licenciou (viď LICENSE). Optimalizovaný by mal byť najmä pre monitory s dotykovým rozhraním, no snaha bude vytvoriť aplikáciu aj pre pohodlné používanie na klasickom desktope a mobilných zariadeniach. Program je vyvýjaný ako offline SPA kiosk aplikácia optimalizovaná pre použitie vo webovom prehliadači Chrome s využitím serverovej technológie Node.js, ktorej web server by mal bežať na localhost-e. Avšak, tým, že Nors je vyvýjaný ako webowá aplikácia je predurčený aj na používanie prostredníctvom internetu, prípadne pre použitie s viacerými počítačmi v jednej LAN sieti s centrálnym serverom a databázou nôt a iných materiálov.

#### Funkcionalita
Cieľom projektu je vytvoriť užívateľsky priateľskú aplikáciu s čistým a jednoduchým dizajnom, ktorá sa bude v čo najväčšej miere približovať (v lepšom prípade presahovať) používaniu klasických kníh. Dotyková obrazovka, by mala mať také parametre aby dokázala zobraziť stranu knihy tak, že jej veľkosť na dispelji bude korešpondovať so skutnočnou veľkosťou strany skutočnej knihy avšak s možnosťou prispôsobenia jej veľkosti, čo sa s papierovou verziou knihy uskutnočniť nedá. Okrem toho má aplikácia ponúkať oproti tlačenej verzie knihy ďalšie funkcie: záložky, vyhľadávanie, skrývanie strán, invertovanie farby (čiene pozadie, biele noty) a iné. Prehľad aktuálnych a plánovaných funkcií nájdete nižšie:
###### Aktuálne funkcie:
- tri podokná v jednom okne, každé pre jednu knihu
- možnosť prispôsobiť šírku podokna
- automatické skrývanie scrollbar-u
- scrollbar na ľavej strane kvôli ergonómii (organista používa ľavú ruku na manipuláciu s knihami počas hry)
- možnosť zväčšovania/zmenšovania strán knihy 
- možnosť zobrazenia viacerých strán knihy vedľa seba/pod sebou
###### Plánované funkcie:
- tvorba záložiek pre každú knihu osobitne
- rýchle listovanie v knihe prostredníctvom obsahu
- fulltext vyhľadávanie v obsahu knihy
- možnosť vložiť vlastnú knihu
- možnosť vytvoriť vlastnú knihu z existujúcich
- automatická tvorba knihy na základe dátumu (napr. ak systém zistí, že je sviatok sv. Pavla automaticky vyskladá knihu s piesňami, žalmami, ordináriami a pod. vhodnými k danému sviatku)
- jedna strana v knihe môže mať súčastne viac variant (napr. JKS 268 bude zobrazená v originálnej verzii a bude možnosť pieseň prernúť na transponovanú verziu)
- rýchle vyhľadávanie na základe názvu knihy, typu piesne (napr. vyhľadať všetky Sanctus), čísla piesne a pod.
- podpora zobrazenia viacerých formátor: obrázy, pdf, office dokumenty, html, xml, musicXML, ...
- nočný šýl zobrazenia
- možnosť nastavenia jasu obrazovky
- menu pre ovládanie prezentácii/textov pre ľud zobrazených cez projektory alebo televízory 

### KONTAKT
Akékoľvek pripomienky a otázky zasielajte na mail skv4ro@gmail.com

### LIVE DEMO: 
http://www.juvius.sk/nors

- zobrazené knihy majú len po 10 strán kvôli rýchlosti načítania stránky
- nie je ešte dorobená automatická zmena mieky pri zmene veľkosti okna
- zatiaľ chýba navigačné menu
- scroll sa automaticky aktualizuje len v prehliadači Chrome a Chrome mobile
- zväčšovanie a zmenšovanie nôt funguje zatiaľ len na dotykových zariadeniach s použitím 2 prstov (pinchzoom)

### PODPORA: 
Projekt môžete finančne podporiť ľubovoľnou čiastkou na číslo účtu s poznámkou "Nors": 
> SK46 0200 0000 0027 6469 5059

- Potrebná cieľová suma: `700€`
- Vyzbierané (ku dňu 12.01.2019): `0€`
