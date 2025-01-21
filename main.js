document.addEventListener('DOMContentLoaded', function(){
//----------------Vocabulaire----------------//
    if(document.getElementById('vocabulairePagina')){
        console.log('VocabPagina');
        vocLijstenCheckboxes = document.getElementById('vocLijsten');
        extraOptiesCheckboxes = document.getElementById('opties');
        actieveVocLijst = '';
        nederlandsWoord = '';
        fransWoord = '';
        woordenGedaan = 0;
        accentGevoelig = false;
        lijstLengte = 0
        woordenCompleted = 0
        woordenJuistCompleted = 0
        rightAnswerAudio = new Audio('rightAnswer.mp3');
        wrongAnswerAudio = new Audio('wrongAnswer.mp3');
        rightAnswerAudio.volume = 0.2;
        wrongAnswerAudio.volume = 0.2;
        mute = false;
        audioAmp = 1;
        foutenLijst = [[],[]];
        amountOfRows = 1;
        aantalLijsten = 5;
        extraOptiesCheckboxes.addEventListener('change', function(){
            actieveOptiesCheckboxes= extraOptiesCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
            accentGevoelig = true;
            mute = false
            wrongAnswerAudio = new Audio('wrongAnswer.mp3');
            AudioAmp = 1;
            if(actieveOptiesCheckboxes.length > 0){
                for(var i = 0; i < actieveOptiesCheckboxes.length; i++){
                    if(actieveOptiesCheckboxes[i].getAttribute('id') === 'muteKnop'){
                        mute = true
                    }
                    if(actieveOptiesCheckboxes[i].getAttribute('id') === 'duckModeKnop'){
                        wrongAnswerAudio = new Audio('quack.mp3');
                        audioAmp = 5;
                    }
                    if(actieveOptiesCheckboxes[i].getAttribute('id') === 'accentGevoeligKnop'){
                        accentGevoelig = false;
                    }
                }
            }
        });
        document.getElementById('addVocListButton').addEventListener('click', function(){
            alert('komt nog')
            // document.getElementById('vocListAddScreen').classList.remove('hidden')
        });
        document.getElementById('addVocListCloseButton').addEventListener('click', function(){
            document.getElementById('vocListAddScreen').classList.add('hidden')
        });
        document.getElementById('addWordButton').addEventListener('click', function(){
            amountOfRows++
            newVocListTable = document.getElementById('newVocListTable');
            newRow = newVocListTable.insertRow(-1);
            newRow.setAttribute("id", "nieuweVocLijstRij" + amountOfRows);
            newCell1 = newRow.insertCell(0);
            newCell2 = newRow.insertCell(1);
            newCell1.innerHTML += '<input type="text" id="nieuweVocLijstNL' + amountOfRows + '" required></input>';
            newCell2.innerHTML += '<input type="text" id="nieuweVocLijstFR' + amountOfRows + '" required></input>';
        });
        document.getElementById('removeWordButton').addEventListener('click', function(){
            document.getElementById('nieuweVocLijstRij' + amountOfRows).remove();
            amountOfRows--;
        });
        document.getElementById('newVocabListForm').addEventListener('submit', function(event){
            event.preventDefault();
            tempNewVocList = [[],[]]
            for(i = 1; i < (amountOfRows +1); i++){
                tempNewVocList[0].push(document.getElementById('nieuweVocLijstNL' + String(i)).value);
                tempNewVocList[1].push(document.getElementById('nieuweVocLijstFR' + String(i)).value);
                document.getElementById('nieuweVocLijstRij' + String(i)).remove();
            }
            amountOfRows = 0;
            console.log(tempNewVocList);
            document.getElementById('addWordButton').click();
        });
        vocLijstenCheckboxes.addEventListener('change', function(){
            lijstLengte = 0;
            woordenCompleted = 0;
            woordenJuistCompleted = 0;
            foutenLijstActief = false;
            // VocabLijsten
            stringNLT1E1 = 'een toekomst, het vrijwilligerswerk (type 1 le b...), een vrijwilliger (type 1 un b...), een vrijwilligster (type 1 une b...), een zaak, een goede zaak, een oorzaak, een verandering, een leider, een leidster, de diversiteit, een engagement, iets waar je je voor inzet, het milieu, een generatie, een merk, een lid (mannelijk), een lid (vrouwelijk), een jeugdbeweging, een reden, een tendens, een trend, een vrijwilliger (type2 un v...), een vrijwilligster (type2 une v...), nuttig, handelen, bevestigen, bevestigd worden, beschouwen, zich beschouwen als, bouwen, opbouwen, uitdelen, zich engageren, zich inzetten, duwen, drijven tot, zich voelen, zin hebben, zin hebben (in/om), mensen ontmoeten, iemand een plezier doen, kortom, tweedehands, een ongelijkheid, de gerechtigheid, een inzameling, een dakloze (volledig), het vrijwilligerswerk (type 2 le v...), bewogen door (mannelijk), bewogen door (vrouwelijk), onmiddelijk / snel (mannelijk), onmiddelijk / snel (vrouwelijk), opvallend / opmerkelijk (mannelijk), opvallend / opmerkelijk (vrouwelijk), tijd besteden aan, bewegen om/tot, aansporen om/tot, iemand aanwerven, een boodschap overbrengen, tegenwoordig, nu'
            nlTour1Etape1 = stringNLT1E1.split(', ');
            stringFRT1E1 = 'un avenir, le bénévolat, un bénévole, une bénévole, une cause, une bonne cause, une cause, un changement, un chef, une cheffe, la diversité, un engagement, un engagement, l\'environement, une génération, une marque, un membre, une membre, un mouvement de jeunesse, une raison, une tendance, une tendance, un volontaire, une volontaire, utile, agir, confirmer, se confirmer, considérer, se considérer comme, construire, construire, distribuer, s\'engager, s\'engager, pousser, pousser à, se sentir, avoir envie, avoir envie de, faire des rencontres, faire plaisir à, bref, de seconde main, une inégalité, la justice, une récolte, un sans domicile fixe, le volontariat, animé par, animée par, immédiat, immédiate, marquant, marquante, consacrer à, engager à, engager à, engager quelqu\'un, faire passer un message, actuellement, actuellement'
            frTour1Etape1 = stringFRT1E1.split(', ');
            multiArrayT1E1 = [nlTour1Etape1, frTour1Etape1];
    
            stringNLT1E2 = 'een vereniging, een beweging (type 1 une a...), een verdediger, een verdedigster, een recht, de ecologie, een vorming, een educatie, een manifestatie, een betoging, een bedreiging, een beweging (type 2 un m...), de vervuiling, het racisme, een slogan, een leuze, het geweld, overtuigd van (mannelijk), overtuigd van (vrouwelijk), efficiënt, doeltreffend, feministisch, ongelooflijk, vrijwillig, verbeteren, strijden (type 1 se b...), vechten voor (type 1 se b...), vechten tegen (type1 se b...), overtuigen, verdedigen, hekelen, aanklagen, zich opwinden over, zich ergeren aan, zich zorgen maken over / om, strijden (type 2 l...), vechten voor (type 2 l...), vechten tegen (type2 l...), betogen, deelnemen aan (type 1 pa...), voorstellen om, eisen, recycleren, vertegenwoordigen, erin slagen te, lijden, steunen, ondersteunen, recht hebben op, gemeenschappelijk hebben, staken, zorg dragen voor, lessen missen, afval sorteren, ten voordele van, iets anders, een groei, de discriminatie, de mensheid, de junkfood, de spot, een weigering, soepel, vloeiend, verlaten, in de steek laten, toegeven aan, denken, menen, zich mobiliseren, ondergaan, de blik afwenden, vastberaden zijn om (mannelijk), vastberaden zijn om (vrouwelijk), zijn deel doen, tot actie overgaan, het woord nemen, deelnemen aan (type 2 pr...), een ... wending nemen (... letterlijk overnemen), zijn ecologische voetafdruk verkleinen, zich bewust zijn van, uit zijn confortzone treden, iemand te hulp komen';
            nlTour1Etape2 = stringNLT1E2.split(', ');
            stringFRT1E2 = 'une association, une association, un défenseur, une défenseuse, un droit, l\'ecologie, une éducation, une éducation, une manifestation, une manifestation, une menace, un mouvement, la pollution, le racisme, un slogan, un slogan, la violence, convaincu de, convaincue de, efficace, efficace, féministe, incroyable, volontaire, améloirer, se battre, se battre pour, se battre contre, convaincre, défendre, dénoncer, dénoncer, s\'enerver de, s\'enerver de, s\'inquiéter de, lutter, lutter pour, lutter contre, manifester, participer à, proposer de, réclamer, recycler, représenter, réussir à, souffrir, soutenir, soutenir, avoir droit à, avoir en commun, faire la grève, prendre soin de, rater des cours, trier des déchets, au profit de, autre chose, une croissance, la discrimination, l\'Humanité, la mallbouffe, la moquerie, un refus, fluide, fluide, abandonner, abandonner, céder à, estimer, estimer, se mobiliser, subir, détourner le regard, être déterminé à, être déterminée à, faire sa part, se mettre en action, prendre la parole, prendre part à, prendre un tournant ..., réduire son empreinte écologique, se rendre compte de, sortir de sa zone de confort, venir en aide à quelqu\'un';
            frTour1Etape2 = stringFRT1E2.split(', ');
            multiArrayT1E2 = [nlTour1Etape2, frTour1Etape2];
    
            stringNLT2E1 = 'een sticker, een brievenbus, een kartonnen doos, een online catalogus, een gift, schenking, een uitwisseling, een rek, de werking, het functioneren, een lampen slinger, het materiaal, een voorwerp, het delen, een pictogram, een penseel, een verborstel, het uitlenen, een wiel, een dienst, een deurbel, een bel, een stofzuiger, een keukenweegschaal, een weegschaal, een ladder, een strijkijzer, een grill, een barbecue, een zaklamp, een naaimachine, een hamer, een mixer, een taartvorm, een tuingereedschap, een gereedschap, een boormachine, een fietspomp, een zaag, een fondueset, een grasmachine, een schroevendraaier, stom, stevig, Zwitsers, plakken, bestellen, zich verbinden, verbinding maken, uitwisselen, iets van iemand (ont)lenen, lenen (type 1), aanmoedigen om, (weg)gooien, delen met, deelnemen aan, (uit)lenen aan, opruimen, (in elkaar) vijzen, een tak afzagen, een dienst vragen, een nagel inkloppen, een band oppompen, het gras maaien, af en toe, zelden, een raclettetoestel, een vergiet, de overconsumptie, schitterend (mannelijk), schitterend (vrouwelijk), zijn gezicht laten zien, in je buurt';
            nlTour2Etape1 = stringNLT2E1.split(', ');
            stringFRT2E1 = 'un autocollant, une boîte aux lettres, une boîte en carton, un catalogue en ligne, un don, un don, un échange, une étagère, le fonctionnement, le fonctionnement, une guirlande de lampes, le matériel, un objet, le partage, un pictogramme, un pinceau, un pinceau, un prêt, une roue, un service, une sonnette, une sonnette, un aspirateur, une balance de cuisine, une balance, une échelle, un fer à repasser, un grill, un grill, une lampe de poche, une machine à coudre, un marteau, un mixeur, un moule à gâteau, un outil de jardin, un outil, une perceuse, une pompe à vélo, une scie, un set à fondue, une tondeuse à gazon, un tournevis, bête, solide, suisse, coller, commander, se connecter, se connecter, échanger, emprunter quelque chose à quelqu\'un, emprunter, encourager à, jeter, partager avec, participer à, prêter à, ranger, visser, couper une branche, demander un service, enfoncer un clou, gonfler un pneu, tondre le gazon, de temps en temps, rarement, un four à raclette, une passoire, la surconsommation, lumineux, lumineuse, pointer le bout de son nez, autour de chez soi';
            frTour2Etape1 = stringFRT2E1.split(', ');
            multiArrayT2E1 = [nlTour2Etape1, frTour2Etape1];
    
            stringNLT2E2 = 'een activiteit, een hulp, een mening (type 1), een groepje, een vriendengroepje, een geluid, een lawaai, een gemeenschap, de energie, een ervaring, een handleiding, een aanbod, een mening (type 2), een organisator, een organisatrice, een particulier, een product, een spot, een projector, een inkomen, een technicus, een technica, favoriet (mannelijk), favoriet (vrouwelijk), technisch, waarderen, appreciëren, vaststellen, merken, functioneren, werken (in context van een machine), huren, beloven, bedriegen, het bevalt me, ik vind het leuk, een handje helpen, een bericht achterlaten, zijn hulp aanbieden, naar mijn mening, met plezier (versie 1), met plezier (versie 2), een goed, een financiële winst, een ruil(handel), een bedrog, erin slagen te, een beroep doen op, een blik werpen op';
            nlTour2Etape2 = stringNLT2E2.split(', ');
            stringFRT2E2 = 'une activité, une aide, un avis, une bande, une bande d\'amis, un bruit, un bruit, une communauté, l\'energie, une expérience, un manuel, une offre, une opinion, un organisateur, une organisatrice, un particulier, un produit, un projecteur, un projecteur, un revenu, un technicien, une technicienne, favori, favorite, technique, apprécier, apprécier, constater, constater, functionner, functionner, louer, promettre, tromper, ça me plait, ça me plait, donner un coup de main, laisser un message, offrir son aide, à mon avis, avec plaisir, volontiers, un bien, un gain financier, le troc, une tromperie, parvenir à, faire appel à, jeter un coup d\'oeil sur';
            frTour2Etape2 = stringFRT2E2.split(', ');
            multiArrayT2E2 = [nlTour2Etape2, frTour2Etape2];
    
            // Werkwoorden lijst
            stringNLWerkwoordLijst = 'vinden, geven (versie 1 d...), dansen, springen, praten, een hekel hebben aan, winnen, houden van, vragen, laten, blijven, denken aan, kijken, aankomen, dragen, binnenkomen, vallen, tonen, stoppen, naar boven gaan, luisteren, doorgaan, verdergaan, spelen, wandelen (versie 1 m...), voorstellen, werken, sluiten, vertellen, zingen, lachen met, uitlachen, zich amuseren, zich concentreren, zich interesseren, zich afvragen, zich verontschuldigen, ontmoeten, naar elkaar kijken, zich herinneren (versie 1 se r...), zich herinneren (versie 2 se s...), overwegkunnen met, zich haasten, zwijgen, vergeten, roepen, controleren, eten, wisselen, verbeteren, verhuizen, storen, zwemmen, bewegen, reizen, ordenen, opruimen, aankondigen, (uit)wissen, beginnen, werpen (versie 1 L...), gooien (versie 1 L...), plaatsen, vooruitgaan, kopen, opheffen, opstaan, meenemen, wandelen (versie 2 se p...), leiden, brengen, terugbrengen, vriezen, wegen, heten, terugbellen, gooien (versie 2 J...), werpen (versie 2 J...), gebruiken, proberen, poetsen, (in)drukken, opsturen, afvegen, zich vervelen, betalen, hopen, beschermen, herhalen, verkiezen, aanvullen, regelen, beëindigen, vullen, samenbrengen, nadenken, verdikken, vermageren, kiezen, applaudisseren, reageren, groeien, groter worden, slagen (in iets), gehoorzamen, verwittigen, straffen, garanderen, verrijken, verzwakken, definiëren, omschrijven, rood worden, blozen, verdiepen, genezen, bleek worden, overgeven, ouder worden, slopen, liegen, ruiken, voelen, opdienen, bedienen, serveren, uitgaan, slapen, vertrekken, openen, bedekken, ontdekken, offreren, geven (versie 2 o...), verwelkomen, plukken, afzien, lijden, teruggeven, verkopen, naar beneden gaan, horen, wachten, verliezen, antwoorden, afhangen van, smelten, maaien, verdedigen, hebben, zijn, gaan, kennen, zeggen, lezen, maken, doen, zetten, leggen, komen, worden, moeten (versie 1 d...), moeten (versie 2 enkel il vorm), kunnen, mogen, verkrijgen, ontvangen, weten, zien, willen, nemen, leren, begrijpen, vechten, slaan, verslaan, beloven, overhandigen, klagen, vrezen, uitzetten, uitschakelen, behalen, bereiken (versie 1 a...), schilderen, verven, toevoegen, bijvoegen, bereiken (versie 2 r...)'
            stringFRWerkwoordenLijst = 'trouver, donner, danser, sauter, parler, détester, gagner, aimer, demander, laisser, rester, penser, regarder, arriver, porter, entrer, tomber, montrer, arrêter, monter, écouter, continuer, continuer, jouer, marcher, présenter, travailler, fermer, raconter, chanter, se moquer, se moquer, s\'amuser, se concentrer, s\'intéresser, se demander, s\'excuser, se rencontrer, se regarder, se rappeler, se souvenir de, s\'entendre avec, se dépêcher, se taire, oublier, crier, vérifier, manger, changer, corriger, déménager, déranger, nager, bouger, voyager, ranger, ranger, annoncer, effacer, commencer, lancer, lancer, placer, avancer, acheter, lever, se lever, emmener, se promener, mener, mener, ramener, geler, peser, appeler, rappeler, jeter, jeter, employer, essayer, nettoyer, appuyer, envoyer, essuyer, s\'ennuyer, payer, espérer, protéger, répéter, préférer, compléter, régler, finir, remplir, réunir, réfléchir, grossir, maigrir, choisir, applaudir, réagir, grandir, grandir, réussir, obéir, avertir, punir, garantir, enrichir, faiblir, définir, définir, rougir, rougir, approfondir, guérir, pâlir, vomir, vieillir, démolir, mentir, sentir, sentir, servir, servir, servir, sortir, dormir, partir, ouvrir, couvrir, découvrir, offrir, offrir, accueillir, cueillir, souffrir, souffrir, rendre, vendre, descendre, entendre, attendre, perdre, répondre, dépendre, fondre, tondre, défendre, avoir, être, aller, connaître, dire, lire, faire, faire, mettre, mettre, venir, devenir, devoir, falloir, pouvoir, pouvoir, recevoir, recevoir, savoir, voir, vouloir, prendre, apprendre, comprendre, battre, battre, battre, promettre, remettre, se plaindre, craindre, éteindre, éteindre, atteindre, atteindre, peindre, peindre, joindre, joindre, rejoindre'
            nlWerkwoordenLijst = stringNLWerkwoordLijst.split(', ');
            frWerkwoordenLijst = stringFRWerkwoordenLijst.split(', ')
            multiArrayWerkwoordenLijst = [nlWerkwoordenLijst, frWerkwoordenLijst]
    
            //Verbes pronominaux
            stringNLPronominauxLijst = 'zich amuseren, heten, zijn tanden poetsen, gaan slapen, zich haasten, zich uitkleden, zich ontspannen, douchen, weggaan, zich vervelen, zich opmaken, gebeuren, zich kammen, wandelen, zich scheren, rusten, elkaar zien, wakker worden, opstaan, zich aankleden';
            stringFRPronominauxLijst = 's\'amuser, s\'appeler, se brosser les dents, se coucher, se dépêcher, se déshabiller, se détendre, se doucher, s\'en aller, s\'ennuyer, se maquiller, se passer, se peigner, se promener, se raser, se reposer, se voir, se réveiller, se lever, s\'habiller';
            nlPronominauxLijst = stringNLPronominauxLijst.split(', ');
            frPronominauxLijst = stringFRPronominauxLijst.split(', ');
            multiArrayPromonimauxLijst = [nlPronominauxLijst, frPronominauxLijst]
    
            //Uitzonderingen Passé composé
            stringInfinitievePasseComposeLijst = 'être (zijn), avoir (hebben), devoir (moeten), voir (zien), vouloir (willen), écrire (schrijven), faire (doen / maken), prendre (nemen), savoir (weten), pouvoir (kunnen), lire (lezen), mettre (leggen/zetten), mourir (sterven), naître (geboren worden), plaire (bevallen), recevoir (ontvangen), rire (lachen), résoudre (oplossen), suivre (volgen), tenir (houden), valoir (waard zijn), vivre (leven), venir (komen), boire (drinken), connaître (kennen), dire (zeggen), falloir (moeten / nodig zijn), ouvrir (openen)';
            stringVervoegdePasseComposeLijst = 'été, eu, dû, vu, voulu, écrit, fait, pris, su, pu, lu, mis, mort, né, plu, reçu, ri, résolu, suivi, tenu, valu, vécu, venu, bu, connu, dit, fallu, ouvert';
            infinitievePasseComposeLijst = stringInfinitievePasseComposeLijst.split(', ');
            vervoegdePasseComposeLijst = stringVervoegdePasseComposeLijst.split(', ');
            multiArrayPasseComposeLijst = [infinitievePasseComposeLijst, vervoegdePasseComposeLijst];
            // END Vocablijsten
            var multiArrays = {
                T1E1: multiArrayT1E1,
                T1E2: multiArrayT1E2,
                T2E1: multiArrayT2E1,
                T2E2: multiArrayT2E2,
                errors: foutenLijst
            };
            actieveVocLijst = [];
            actieveVocLijstCheckboxes = vocLijstenCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
            if(actieveVocLijstCheckboxes.length > 0){
                document.getElementById('translationInput').disabled = false;
                for (var i = 0; i < actieveVocLijstCheckboxes.length; i++){
                     actieveVocLijst = actieveVocLijst.concat(multiArrays[actieveVocLijstCheckboxes[i].getAttribute("id")]);
                     if(actieveVocLijstCheckboxes[i].getAttribute("id") === 'errors'){
                        foutenLijstActief = true;
                     }
                  }
                for (var i = 0; i < actieveVocLijst.length; i++) {
                    lijstLengte += actieveVocLijst[i].length;
                }
                lijstLengte /= 2;
                  start();
            }else{
                document.getElementById('translationInput').disabled = true;
                document.getElementById('nederlandsWoord').innerHTML = 'Selecteer een lijst om te beginnen'
            }
        });
        formulier = document.getElementById('formulier')
        formulier.addEventListener('submit', function(event){
            event.preventDefault();
            inputWaarde = document.getElementById("translationInput").value;
            document.getElementById("translationInput").value = "";
            wrongAnswerAudio.pause();
            wrongAnswerAudio.currentTime = 0;
            rightAnswerAudio.pause();
            rightAnswerAudio.currentTime = 0;
            juistOfFout = checkWord(inputWaarde, fransWoord);
            woordenCompleted++
            saveStats(inputWaarde, nederlandsWoord, fransWoord, juistOfFout);
            if(woordenCompleted === lijstLengte){
                document.getElementById('translationInput').disabled = true;
                document.getElementById('nederlandsWoord').innerHTML = 'Lijst geoefend, selecteer een nieuwe lijst of refresh als je verder wilt doen.';
                if(document.getElementById('errors').checked == true){
                    document.getElementById('errors').disabled = true;
                    document.getElementById('errors').checked = false;
                };
            }
            start()
        });
        function start(){
            randomWoord = getRandomWordFromActiveList();
            nederlandsWoord = randomWoord.nl;
            fransWoord = randomWoord.fr;
            displayNederlandsWoord(nederlandsWoord);
        };
        function saveStats(vorigInputWoord, vorigNLWoord, vorigFRWoord, correctOrWrong){
            if(correctOrWrong){
                document.getElementById('juistOfFout').innerHTML = 'Juist';
            }else{
                document.getElementById('juistOfFout').innerHTML = 'Fout';
            };
            document.getElementById('woordenComplete').innerHTML = String(woordenCompleted) + ' / ' + String(lijstLengte);
            document.getElementById('correctPercentage').innerHTML = String((woordenJuistCompleted / woordenCompleted * 100).toFixed(2)) + '%';
            document.getElementById('vorigNederlandsWoord').innerHTML = vorigNLWoord;
            document.getElementById('vorigeInput').innerHTML = vorigInputWoord;
            document.getElementById('vorigFransWoord').innerHTML = vorigFRWoord;
        };
        function checkWord(input, expected){
            input = input.trim();
            input = input.toLowerCase();
            expected = expected.toLowerCase();
            if(accentGevoelig){
                input = String(input);
                input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                expected = String(expected);
                expected = expected.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }
            if(mute){
                rightAnswerAudio.volume = 0.0;
                wrongAnswerAudio.volume = 0.0;
            }else{
                rightAnswerAudio.volume = 0.2;
                wrongAnswerAudio.volume = 0.2 * audioAmp;
            }
            if(input == expected){
                woordenJuistCompleted++;
                rightAnswerAudio.play()
                return true;
            }else{
                wrongAnswerAudio.play()
                foutenLijst[0].push(nederlandsWoord);
                foutenLijst[1].push(fransWoord);
                document.getElementById('errors').disabled = false;
                if(foutenLijstActief){
                    lijstLengte++;
                }
                return false;
            }
        };
        function displayNederlandsWoord(nederlandsWoord){
            document.getElementById('nederlandsWoord').innerHTML = nederlandsWoord;
        };
        function getRandomWordFromActiveList(){
            //welke lijst moet woord gekozen worden
            whichList = getRandomInt(1, actieveVocLijst.length/2 +1);
            randomNummerIndex = getRandomInt(0, actieveVocLijst[whichList*2-1].length)
            randomFransWoord = String(actieveVocLijst[whichList*2 -1].splice(randomNummerIndex, 1));
            randomNederlandsWoord = String(actieveVocLijst[whichList*2 -2].splice(randomNummerIndex, 1));
            if(randomFransWoord === ''){
                actieveVocLijst.splice(whichList*2-2, 2)
                getRandomWordFromActiveList();
            }
            return{
                fr: randomFransWoord,
                nl: randomNederlandsWoord
            };
        };
    }else if(document.getElementById('conjugaisonPagina')){
        console.log('Conjugaison')
        const verbLibrary = {
            verbs: {
                être: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'suis',
                            tu: 'es',
                            'il/elle/on': 'est',
                            nous: 'sommes',
                            vous: 'êtes',
                            'ils/elles': 'sont'
                        },
                        futur: {
                            je: 'serai',
                            tu: 'seras',
                            'il/elle/on': 'sera',
                            nous: 'serons',
                            vous: 'serez',
                            'ils/elles': 'seront'
                        },
                        passé: {
                            je: 'fus',
                            tu: 'fus',
                            'il/elle/on': 'fût',
                            nous: 'fûmes',
                            vous: 'fûtes',
                            'ils/elles': 'furent'
                        },
                        imparfait: {
                            'j\'': 'étais',
                            tu: 'étais',
                            'il/elle/on': 'était',
                            nous: 'étions',
                            vous: 'étiez',
                            'ils/elles': 'étaient'
                        },
                        conditionnelPrésent: {
                            je: 'serais',
                            tu: 'serais',
                            'il/elle/on': 'serait',
                            nous: 'serions',
                            vous: 'seriez',
                            'ils/elles': 'seraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'sois',
                            'que tu': 'sois',
                            'q\'il/elle/on': 'soit',
                            'que nous': 'soyons',
                            'que vous': 'soyez',
                            'qu\'ils/elles': 'soient'
                        },
                        futurProche: {
                            je: 'vais être',
                            tu: 'vas être',
                            'il/elle/on': 'va être',
                            nous: 'allons être',
                            vous: 'allez être',
                            'ils/elles': 'vont être'
                        },
                        passéComposé: {
                            'j\'': 'ai été',
                            tu: 'as été',
                            'il/elle/on': 'a été',
                            nous: 'avons été',
                            vous: 'avez été',
                            'ils/elles': 'ont été'
                        }
                    }
                },
                avoir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            'j\'': 'ai',
                            tu: 'as',
                            'il/elle/on': 'a',
                            nous: 'avons',
                            vous: 'avez',
                            'ils/elles': 'ont'
                        },
                        futur: {
                            'j\'': 'aurai',
                            tu: 'auras',
                            'il/elle/on': 'aura',
                            nous: 'aurons',
                            vous: 'aurez',
                            'ils/elles': 'auront'
                        },
                        passé: {
                            'j\'': 'eus',
                            tu: 'eus',
                            'il/elle/on': 'eut',
                            nous: 'eûmes',
                            vous: 'eûtes',
                            'ils/elles': 'aurent'
                        },
                        imparfait: {
                            'j\'': 'avais',
                            tu: 'avais',
                            'il/elle/on': 'avait',
                            nous: 'avions',
                            vous: 'aviez',
                            'ils/elles': 'avaient'
                        },
                        conditionnelPrésent: {
                            'j\'': 'aurais',
                            tu: 'aurais',
                            'il/elle/on': 'aurait',
                            nous: 'aurions',
                            vous: 'auriez',
                            'ils/elles': 'auraient'
                        },
                        subjonctifPrésent: {
                            'que j\'': 'aie',
                            'que tu': 'aies',
                            'qu\'il/elle/on': 'ait',
                            'que nous': 'ayons',
                            'que vous': 'ayez',
                            'qu\'ils/elles': 'aient'
                        },
                        futurProche: {
                            je: 'vais avoir',
                            tu: 'vas avoir',
                            'il/elle/on': 'va avoir',
                            nous: 'allons avoir',
                            vous: 'allez avoir',
                            'ils/elles': 'vont avoir'
                        },
                        passéComposé: {
                            'j\'': 'ai eu',
                            tu: 'as eu',
                            'il/elle/on': 'a eu',
                            nous: 'avons eu',
                            vous: 'avez eu',
                            'ils/elles': 'ont eu'
                        }
                    }
                },
                faire: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'fais',
                            tu: 'fais',
                            'il/elle/on': 'fait',
                            nous: 'faisons',
                            vous: 'faites',
                            'ils/elles': 'font'
                        },
                        futur: {
                            je: 'ferai',
                            tu: 'feras',
                            'il/elle/on': 'fera',
                            nous: 'ferons',
                            vous: 'ferez',
                            'ils/elles': 'feront'
                        },
                        passé: {
                            je: 'fis',
                            tu: 'fis',
                            'il/elle/on': 'fit',
                            nous: 'fîmes',
                            vous: 'fîtes',
                            'ils/elles': 'firent'
                        },
                        imparfait: {
                            je: 'faisais',
                            tu: 'faisais',
                            'il/elle/on': 'faisait',
                            nous: 'faisions',
                            vous: 'faisiez',
                            'ils/elles': 'faisaient'
                        },
                        conditionnelPrésent: {
                            je: 'ferais',
                            tu: 'ferais',
                            'il/elle/on': 'ferait',
                            nous: 'ferions',
                            vous: 'feriez',
                            'ils/elles': 'feraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'fasse',
                            'que tu': 'fasses',
                            'qu\'il/elle/on': 'fasse',
                            'que nous': 'fassions',
                            'que vous': 'fassiez',
                            'qu\'ils/elles': 'fassent'
                        },
                        futurProche: {
                            je: 'vais faire',
                            tu: 'vas faire',
                            'il/elle/on': 'va faire',
                            nous: 'allons faire',
                            vous: 'allez faire',
                            'ils/elles': 'vont faire'
                        },
                        passéComposé: {
                            'j\'': 'ai fait',
                            tu: 'as fait',
                            'il/elle/on': 'a fait',
                            nous: 'avons fait',
                            vous: 'avez fait',
                            'ils/elles': 'ont fait'
                        }
                    }
                },
                aller: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'vais',
                            tu: 'vas',
                            'il/elle/on': 'va',
                            nous: 'allons',
                            vous: 'allez',
                            'ils/elles': 'vont'
                        },
                        futur: {
                            'j\'': 'irai',
                            tu: 'iras',
                            'il/elle/on': 'ira',
                            nous: 'irons',
                            vous: 'irez',
                            'ils/elles': 'iront'
                        },
                        passé: {
                            'j\'': 'allai',
                            tu: 'allas',
                            'il/elle/on': 'alla',
                            nous: 'allâmes',
                            vous: 'allâtes',
                            'ils/elles': 'allèrent'
                        },
                        imparfait: {
                            'j\'': 'allais',
                            tu: 'allais',
                            'il/elle/on': 'allait',
                            nous: 'allions',
                            vous: 'alliez',
                            'ils/elles': 'allaient'
                        },
                        conditionnelPrésent: {
                            'j\'': 'irais',
                            tu: 'irais',
                            'il/elle/on': 'irait',
                            nous: 'irions',
                            vous: 'iriez',
                            'ils/elles': 'iraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'aille',
                            'que tu': 'ailles',
                            'qu\'il/elle/on': 'aille',
                            'que nous': 'allions',
                            'que vous': 'alliez',
                            'qu\'ils/elles': 'aillent'
                        },
                        futurProche: {
                            je: 'vais aller',
                            tu: 'vas aller',
                            'il/elle/on': 'va aller',
                            nous: 'allons aller',
                            vous: 'allez aller',
                            'ils/elles': 'vont aller'
                        },
                        passéComposé: {
                            'j\'': 'ai allé',
                            tu: 'as allé',
                            'il/elle/on': 'a allé',
                            nous: 'avons allé',
                            vous: 'avez allé',
                            'ils/elles': 'ont allé'
                        }
                    }
                },
                falloir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            'il/elle/on': 'faut'
                            },
                        futur: {
                            'il/elle/on': 'faudra'
                        },
                        passé: {
                            'il/elle/on': 'fallut'
                        },
                        imparfait: {
                            'il/elle/on': 'fallait'
                        },
                        conditionnelPrésent: {
                            'il/elle/on': 'faudrait'
                        },
                        subjonctifPrésent: {
                            'qu\'il/elle/on': 'faille'
                        },
                        futurProche: {
                            'il/elle/on': 'va falloir'
                        },
                        passéComposé: {
                            'il/elle/on': 'a fallu'
                        }
                    }
                },
                mettre: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'mets',
                            tu: 'mets',
                            'il/elle/on': 'met',
                            nous: 'mettons',
                            vous: 'mettez',
                            'ils/elles': 'mettent'
                        },
                        futur: {
                            je: 'mettrai',
                            tu: 'mettras',
                            'il/elle/on': 'mettra',
                            nous: 'mettrons',
                            vous: 'mettrez',
                            'ils/elles': 'mettront'
                        },
                        passé: {
                            je: 'mis',
                            tu: 'mis',
                            'il/elle/on': 'mit',
                            nous: 'mîmes',
                            vous: 'mîtes',
                            'ils/elles': 'mirent'
                        },
                        imparfait: {
                            je: 'mettais',
                            tu: 'mettais',
                            'il/elle/on': 'mettait',
                            nous: 'mettions',
                            vous: 'mettiez',
                            'ils/elles': 'mattaient'
                        },
                        conditionnelPrésent: {
                            je: 'mettrais',
                            tu: 'mettrais',
                            'il/elle/on': 'mettrait',
                            nous: 'mettrions',
                            vous: 'mettriez',
                            'ils/elles': 'mettraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'mette',
                            'que tu': 'mettes',
                            'qu\'il/elle/on': 'mette',
                            'que nous': 'mettions',
                            'que vous': 'mettiez',
                            'qu\'ils/elles': 'mettent'
                        },
                        futurProche: {
                            je: 'vais mettre',
                            tu: 'vas mettre',
                            'il/elle/on': 'va mettre',
                            nous: 'allons mettre',
                            vous: 'allez mettre',
                            'ils/elles': 'vont mettre'
                        },
                        passéComposé: {
                            'j\'': 'ai mis',
                            tu: 'as mis',
                            'il/elle/on': 'a mis',
                            nous: 'avons mis',
                            vous: 'avez mis',
                            'ils/elles': 'ont mis'
                        }
                    }
                },
                vouloir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'veux',
                            tu: 'veux',
                            'il/elle/on': 'veut',
                            nous: 'voulons',
                            vous: 'voulez',
                            'ils/elles': 'veulent'
                        },
                        futur: {
                            je: 'voudrai',
                            tu: 'voudras',
                            'il/elle/on': 'voudra',
                            nous: 'voudrons',
                            vous: 'voudrez',
                            'ils/elles': 'voudront'
                        },
                        passé: {
                            je: 'voulus',
                            tu: 'voulus',
                            'il/elle/on': 'voulut',
                            nous: 'voulûmes',
                            vous: 'voulûtes',
                            'ils/elles': 'voulurent'
                        },
                        imparfait: {
                            je: 'voulais',
                            tu: 'voulais',
                            'il/elle/on': 'voulait',
                            nous: 'voulions',
                            vous: 'vouliez',
                            'ils/elles': 'voulaient'
                        },
                        conditionnelPrésent: {
                            je: 'voudrais',
                            tu: 'voudrais',
                            'il/elle/on': 'voudrait',
                            nous: 'voudrions',
                            vous: 'voudriez',
                            'ils/elles': 'voudraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'veuille',
                            'que tu': 'veuilles',
                            'qu\'il/elle/on': 'veuille',
                            'que nous': 'voulions',
                            'que vous': 'vouliez',
                            'qu\'ils/elles': 'veuillent'
                        },
                        futurProche: {
                            je: 'vais vouloir',
                            tu: 'vas vouloir',
                            'il/elle/on': 'va vouloir',
                            nous: 'allons vouloir',
                            vous: 'allez vouloir',
                            'ils/elles': 'vont vouloir'
                        },
                        passéComposé: {
                            'j\'': 'ai voulu',
                            tu: 'as voulu',
                            'il/elle/on': 'a voulu',
                            nous: 'avons voulu',
                            vous: 'avez voulu',
                            'ils/elles': 'ont voulu'
                        }
                    }
                },
                pouvoir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'peux',
                            tu: 'peux',
                            'il/elle/on': 'peut',
                            nous: 'pouvons',
                            vous: 'pouvez',
                            'ils/elles': 'peuvent'
                        },
                        futur: {
                            je: 'pourrai',
                            tu: 'pourras',
                            'il/elle/on': 'pourra',
                            nous: 'pourrons',
                            vous: 'pourrez',
                            'ils/elles': 'pourront'
                        },
                        passé: {
                            je: 'pus',
                            tu: 'pus',
                            'il/elle/on': 'put',
                            nous: 'pûmes',
                            vous: 'pûtes',
                            'ils/elles': 'purent'
                        },
                        imparfait: {
                            je: 'pouvais',
                            tu: 'pouvais',
                            'il/elle/on': 'pouvait',
                            nous: 'pouvions',
                            vous: 'pouviez',
                            'ils/elles': 'pouvaient'
                        },
                        conditionnelPrésent: {
                            je: 'pourrais',
                            tu: 'pourrais',
                            'il/elle/on': 'pourrait',
                            nous: 'pourrions',
                            vous: 'pourriez',
                            'ils/elles': 'pourraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'puisse',
                            'que tu': 'puisses',
                            'qu\'il/elle/on': 'puisse',
                            'que nous': 'puissions',
                            'que vous': 'puissiez',
                            'qu\'ils/elles': 'puissent'
                        },
                        futurProche: {
                            je: 'vais pouvoir',
                            tu: 'vas pouvoir',
                            'il/elle/on': 'va pouvoir',
                            nous: 'allons pouvoir',
                            vous: 'allez pouvoir',
                            'ils/elles': 'vont pouvoir'
                        },
                        passéComposé: {
                            'j\'': 'ai pu',
                            tu: 'as pu',
                            'il/elle/on': 'a pu',
                            nous: 'avons pu',
                            vous: 'avez pu',
                            'ils/elles': 'ont pu'
                        }
                    }
                },
                devoir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'dois',
                            tu: 'dois',
                            'il/elle/on': 'doit',
                            nous: 'devons',
                            vous: 'devez',
                            'ils/elles': 'doivent'
                        },
                        futur: {
                            je: 'devrai',
                            tu: 'devras',
                            'il/elle/on': 'devra',
                            nous: 'devrons',
                            vous: 'devrez',
                            'ils/elles': 'devront'
                        },
                        passé: {
                            je: 'dus',
                            tu: 'dus',
                            'il/elle/on': 'dut',
                            nous: 'dûmes',
                            vous: 'dûtes',
                            'ils/elles': 'durent'
                        },
                        imparfait: {
                            je: 'devais',
                            tu: 'devais',
                            'il/elle/on': 'devait',
                            nous: 'devions',
                            vous: 'deviez',
                            'ils/elles': 'devaient'
                        },
                        conditionnelPrésent: {
                            je: 'devrais',
                            tu: 'devrais',
                            'il/elle/on': 'devrait',
                            nous: 'devrions',
                            vous: 'devriez',
                            'ils/elles': 'devraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'doive',
                            'que tu': 'doives',
                            'qu\'il/elle/on': 'doive',
                            'que nous': 'devions',
                            'que vous': 'deviez',
                            'qu\'ils/elles': 'doivent'
                        },
                        futurProche: {
                            je: 'vais devoir',
                            tu: 'vas devoir',
                            'il/elle/on': 'va devoir',
                            nous: 'allons devoir',
                            vous: 'allez devoir',
                            'ils/elles': 'vont devoir'
                        },
                        passéComposé: {
                            'j\'': 'ai dû',
                            tu: 'as dû',
                            'il/elle/on': 'a dû',
                            nous: 'avons dû',
                            vous: 'avez dû',
                            'ils/elles': 'ont dû'
                        }
                    }
                },
                dire: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'dis',
                            tu: 'dis',
                            'il/elle/on': 'dit',
                            nous: 'disons',
                            vous: 'dites',
                            'ils/elles': 'disent'
                        },
                        futur: {
                            je: 'dirai',
                            tu: 'diras',
                            'il/elle/on': 'dira',
                            nous: 'dirons',
                            vous: 'direz',
                            'ils/elles': 'diront'
                        },
                        passé: {
                            je: 'dis',
                            tu: 'dis',
                            'il/elle/on': 'dit',
                            nous: 'dîmes',
                            vous: 'dîtes',
                            'ils/elles': 'dirent'
                        },
                        imparfait: {
                            je: 'disais',
                            tu: 'disais',
                            'il/elle/on': 'disait',
                            nous: 'disions',
                            vous: 'disiez',
                            'ils/elles': 'disaient'
                        },
                        conditionnelPrésent: {
                            je: 'dirais',
                            tu: 'dirais',
                            'il/elle/on': 'dirait',
                            nous: 'dirions',
                            vous: 'diriez',
                            'ils/elles': 'diraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'dise',
                            'que tu': 'dises',
                            'qu\'il/elle/on': 'dise',
                            'que nous': 'disions',
                            'que vous': 'disiez',
                            'qu\'ils/elles': 'disent'
                        },
                        futurProche: {
                            je: 'vais dire',
                            tu: 'vas dire',
                            'il/elle/on': 'va dire',
                            nous: 'allons dire',
                            vous: 'allez dire',
                            'ils/elles': 'vont dire'
                        },
                        passéComposé: {
                            'j\'': 'ai dit',
                            tu: 'as dit',
                            'il/elle/on': 'a dit',
                            nous: 'avons dit',
                            vous: 'avez dit',
                            'ils/elles': 'ont dit'
                        }
                    }
                },
                comprendre: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'comprends',
                            tu: 'comprends',
                            'il/elle/on': 'comprend',
                            nous: 'comprenons',
                            vous: 'comprenez',
                            'ils/elles': 'comprennent'
                        },
                        futur: {
                            je: 'comprendrai',
                            tu: 'comprendras',
                            'il/elle/on': 'comprendra',
                            nous: 'comprendrons',
                            vous: 'comprendrez',
                            'ils/elles': 'comprendront'
                        },
                        passé: {
                            je: 'compris',
                            tu: 'compris',
                            'il/elle/on': 'comprit',
                            nous: 'comprîmes',
                            vous: 'comprîtes',
                            'ils/elles': 'comprirent'
                        },
                        imparfait: {
                            je: 'comprenais',
                            tu: 'comprenais',
                            'il/elle/on': 'comprenait',
                            nous: 'comprenions',
                            vous: 'compreniez',
                            'ils/elles': 'comprenaient'
                        },
                        conditionnelPrésent: {
                            je: 'comprendrais',
                            tu: 'comprendrais',
                            'il/elle/on': 'comprendrait',
                            nous: 'comprendrions',
                            vous: 'comprendriez',
                            'ils/elles': 'comprendraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'comprenne',
                            'que tu': 'comprennes',
                            'qu\'il/elle/on': 'comprenne',
                            'que nous': 'comprenions',
                            'que vous': 'compreniez',
                            'qu\'ils/elles': 'comprennent'
                        },
                        futurProche: {
                            je: 'vais comprendre',
                            tu: 'vas comprendre',
                            'il/elle/on': 'va comprendre',
                            nous: 'allons comprendre',
                            vous: 'allez comprendre',
                            'ils/elles': 'vont comprendre'
                        },
                        passéComposé: {
                            'j\'': 'ai compris',
                            tu: 'as compris',
                            'il/elle/on': 'a compris',
                            nous: 'avons compris',
                            vous: 'avez compris',
                            'ils/elles': 'ont compris'
                        }
                    }
                },
                croire: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'crois',
                            tu: 'crois',
                            'il/elle/on': 'croit',
                            nous: 'croyons',
                            vous: 'croyez',
                            'ils/elles': 'croient'
                        },
                        futur: {
                            je: 'croirai',
                            tu: 'croiras',
                            'il/elle/on': 'croira',
                            nous: 'croirons',
                            vous: 'croirez',
                            'ils/elles': 'croiront'
                        },
                        passé: {
                            je: 'crus',
                            tu: 'crus',
                            'il/elle/on': 'crut',
                            nous: 'crûmes',
                            vous: 'crûtes',
                            'ils/elles': 'crurent'
                        },
                        imparfait: {
                            je: 'croyais',
                            tu: 'croyais',
                            'il/elle/on': 'croyait',
                            nous: 'croyions',
                            vous: 'croyiez',
                            'ils/elles': 'croyaient'
                        },
                        conditionnelPrésent: {
                            je: 'croirais',
                            tu: 'croirais',
                            'il/elle/on': 'croirait',
                            nous: 'croirions',
                            vous: 'croiriez',
                            'ils/elles': 'croiraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'croie',
                            'que tu': 'croies',
                            'qu\'il/elle/on': 'croie',
                            'que nous': 'croyions',
                            'que vous': 'croyiez',
                            'qu\'ils/elles': 'croient'
                        },
                        futurProche: {
                            je: 'vais croire',
                            tu: 'vas croire',
                            'il/elle/on': 'va croire',
                            nous: 'allons croire',
                            vous: 'allez croire',
                            'ils/elles': 'vont croire'
                        },
                        passéComposé: {
                            'j\'': 'ai cru',
                            tu: 'as cru',
                            'il/elle/on': 'a cru',
                            nous: 'avons cru',
                            vous: 'avez cru',
                            'ils/elles': 'ont cru'
                        }
                    }
                },
                parler: {
                    type: 'regular',
                    tense: {
                        présent: {
                            je: 'parle',
                            tu: 'parles',
                            'il/elle/on': 'parle',
                            nous: 'parlons',
                            vous: 'parlez',
                            'ils/elles': 'parlent'
                        },
                        futur: {
                            je: 'parlerai',
                            tu: 'parleras',
                            'il/elle/on': 'parlera',
                            nous: 'parlerons',
                            vous: 'parlerez',
                            'ils/elles': 'parleront'
                        },
                        passé: {
                            je: 'parlai',
                            tu: 'parlas',
                            'il/elle/on': 'parla',
                            nous: 'parlâmes',
                            vous: 'parlâtes',
                            'ils/elles': 'parlèrent'
                        },
                        imparfait: {
                            je: 'parlais',
                            tu: 'parlais',
                            'il/elle/on': 'parlait',
                            nous: 'parlions',
                            vous: 'parliez',
                            'ils/elles': 'parlaient'
                        },
                        conditionnelPrésent: {
                            je: 'parlerais',
                            tu: 'parlerais',
                            'il/elle/on': 'parlerait',
                            nous: 'parlerions',
                            vous: 'parleriez',
                            'ils/elles': 'parlaient'
                        },
                        subjonctifPrésent: {
                            'que je': 'parle',
                            'que tu': 'parles',
                            'qu\'il/elle/on': 'parle',
                            'que nous': 'parlions',
                            'que vous': 'parliez',
                            'qu\'ils/elles': 'parlent'
                        },
                        futurProche: {
                            je: 'vais parler',
                            tu: 'vas parler',
                            'il/elle/on': 'va parler',
                            nous: 'allons parler',
                            vous: 'allez parler',
                            'ils/elles': 'vont parler'
                        },
                        passéComposé: {
                            'j\'': 'ai parlé',
                            tu: 'as parlé',
                            'il/elle/on': 'a parlé',
                            nous: 'avons parlé',
                            vous: 'avez parlé',
                            'ils/elles': 'ont parlé'
                        }
                    }
                },
                prendre: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'prends',
                            tu: 'prends',
                            'il/elle/on': 'prend',
                            nous: 'prenons',
                            vous: 'prenez',
                            'ils/elles': 'prennent'
                        },
                        futur: {
                            je: 'prendrai',
                            tu: 'prendras',
                            'il/elle/on': 'prenda',
                            nous: 'prendrons',
                            vous: 'prendrez',
                            'ils/elles': 'prendront'
                        },
                        passé: {
                            je: 'pris',
                            tu: 'pris',
                            'il/elle/on': 'prit',
                            nous: 'prîmes',
                            vous: 'prîtes',
                            'ils/elles': 'prirent'
                        },
                        imparfait: {
                            je: 'prenais',
                            tu: 'prenais',
                            'il/elle/on': 'prenait',
                            nous: 'prenions',
                            vous: 'preniez',
                            'ils/elles': 'prenaient'
                        },
                        conditionnelPrésent: {
                            je: 'prendrais',
                            tu: 'prendrais',
                            'il/elle/on': 'prendrait',
                            nous: 'prendrions',
                            vous: 'prendriez',
                            'ils/elles': 'prendraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'prenne',
                            'que tu': 'prennes',
                            'qu\'il/elle/on': 'prenne',
                            'que nous': 'prenions',
                            'que vous': 'preniez',
                            'qu\'ils/elles': 'prennent'
                        },
                        futurProche: {
                            je: 'vais prendre',
                            tu: 'vas prendre',
                            'il/elle/on': 'va prendre',
                            nous: 'allons prendre',
                            vous: 'allez prendre',
                            'ils/elles': 'vont prendre'
                        },
                        passéComposé: {
                            'j\'': 'ai pris',
                            tu: 'as pris',
                            'il/elle/on': 'a pris',
                            nous: 'avons pris',
                            vous: 'avez pris',
                            'ils/elles': 'ont pris'
                        }
                    }
                },
                venir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'viens',
                            tu: 'viens',
                            'il/elle/on': 'vient',
                            nous: 'venons',
                            vous: 'venez',
                            'ils/elles': 'viennent'
                        },
                        futur: {
                            je: 'viendrai',
                            tu: 'viendras',
                            'il/elle/on': 'viendra',
                            nous: 'viendrons',
                            vous: 'viendrez',
                            'ils/elles': 'viendront'
                        },
                        passé: {
                            je: 'vins',
                            tu: 'vins',
                            'il/elle/on': 'vint',
                            nous: 'vînmes',
                            vous: 'vîntes',
                            'ils/elles': 'vinrent'
                        },
                        imparfait: {
                            je: 'venais',
                            tu: 'venais',
                            'il/elle/on': 'venait',
                            nous: 'venions',
                            vous: 'veniez',
                            'ils/elles': 'venaient'
                        },
                        conditionnelPrésent: {
                            je: 'viendrais',
                            tu: 'viendrais',
                            'il/elle/on': 'viendrait',
                            nous: 'viendrions',
                            vous: 'viendriez',
                            'ils/elles': 'viendraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'vienne',
                            'que tu': 'viennes',
                            'qu\'il/elle/on': 'vienne',
                            'que nous': 'venions',
                            'que vous': 'vieniez',
                            'qu\'ils/elles': 'viennent'
                        },
                        futurProche: {
                            je: 'vais venir',
                            tu: 'vas venir',
                            'il/elle/on': 'va venir',
                            nous: 'allons venir',
                            vous: 'allez venir',
                            'ils/elles': 'vont venir'
                        },
                        passéComposé: {
                            'j\'': 'ai venu',
                            tu: 'as venu',
                            'il/elle/on': 'a venu',
                            nous: 'avons venu',
                            vous: 'avez venu',
                            'ils/elles': 'ont venu'
                        }
                    }
                },
                tenir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'tiens',
                            tu: 'tiens',
                            'il/elle/on': 'tient',
                            nous: 'tenons',
                            vous: 'tenez',
                            'ils/elles': 'tiennent'
                        },
                        futur: {
                            je: 'tiendrai',
                            tu: 'tiendras',
                            'il/elle/on': 'tiendra',
                            nous: 'tiendrons',
                            vous: 'tiendrez',
                            'ils/elles': 'tiendront'
                        },
                        passé: {
                            je: 'tins',
                            tu: 'tins',
                            'il/elle/on': 'tint',
                            nous: 'tînmes',
                            vous: 'tîntes',
                            'ils/elles': 'tinrent'
                        },
                        imparfait: {
                            je: 'tenais',
                            tu: 'tenais',
                            'il/elle/on': 'tenait',
                            nous: 'tenions',
                            vous: 'teniez',
                            'ils/elles': 'tenaient'
                        },
                        conditionnelPrésent: {
                            je: 'tiendrais',
                            tu: 'tiendrais',
                            'il/elle/on': 'tiendrait',
                            nous: 'tiendrions',
                            vous: 'tiendriez',
                            'ils/elles': 'tiendraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'tienne',
                            'que tu': 'tiennes',
                            'qu\'il/elle/on': 'tienne',
                            'que nous': 'tenions',
                            'que vous': 'teniez',
                            'qu\'ils/elles': 'tiennent'
                        },
                        futurProche: {
                            je: 'vais tenir',
                            tu: 'vas tenir',
                            'il/elle/on': 'va tenir',
                            nous: 'allons tenir',
                            vous: 'allez tenir',
                            'ils/elles': 'vont tenir'
                        },
                        passéComposé: {
                            'j\'': 'ai tenu',
                            tu: 'as tenu',
                            'il/elle/on': 'a tenu',
                            nous: 'avons tenu',
                            vous: 'avez tenu',
                            'ils/elles': 'ont tenu'
                        }
                    }
                },
                savoir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'sais',
                            tu: 'sais',
                            'il/elle/on': 'sait',
                            nous: 'savons',
                            vous: 'savez',
                            'ils/elles': 'savent'
                        },
                        futur: {
                            je: 'saurai',
                            tu: 'sauras',
                            'il/elle/on': 'saura',
                            nous: 'saurons',
                            vous: 'saurez',
                            'ils/elles': 'saurez'
                        },
                        passé: {
                            je: 'sus',
                            tu: 'sus',
                            'il/elle/on': 'sut',
                            nous: 'sûmes',
                            vous: 'sûtes',
                            'ils/elles': 'surent'
                        },
                        imparfait: {
                            je: 'saurai',
                            tu: 'sauras',
                            'il/elle/on': 'saura',
                            nous: 'saurons',
                            vous: 'saurez',
                            'ils/elles': 'sauront'
                        },
                        conditionnelPrésent: {
                            je: 'saurais',
                            tu: 'saurais',
                            'il/elle/on': 'saurait',
                            nous: 'saurions',
                            vous: 'sauriez',
                            'ils/elles': 'sauraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'sache',
                            'que tu': 'saches',
                            'qu\'il/elle/on': 'sache',
                            'que nous': 'sachions',
                            'que vous': 'sachiez',
                            'qu\'ils/elles': 'sachent'
                        },
                        futurProche: {
                            je: 'vais savoir',
                            tu: 'vas savoir',
                            'il/elle/on': 'va savoir',
                            nous: 'allons savoir',
                            vous: 'allez savoir',
                            'ils/elles': 'vont savoir'
                        },
                        passéComposé: {
                            'j\'': 'ai su',
                            tu: 'as su',
                            'il/elle/on': 'a su',
                            nous: 'avons su',
                            vous: 'avez su',
                            'ils/elles': 'ont su'
                        }
                    }
                },
                aimer: {
                    type: 'regular',
                    tense: {
                        présent: {
                            'j\'': 'aime',
                            tu: 'aimes',
                            'il/elle/on': 'aime',
                            nous: 'aimons',
                            vous: 'aimez',
                            'ils/elles': 'aiment'
                        },
                        futur: {
                            'j\'': 'aimerai',
                            tu: 'aimeras',
                            'il/elle/on': 'aimera',
                            nous: 'aimerons',
                            vous: 'aimerez',
                            'ils/elles': 'aimeront'
                        },
                        passé: {
                            'j\'': 'aimai',
                            tu: 'aimas',
                            'il/elle/on': 'aima',
                            nous: 'aimâmes',
                            vous: 'aimâtes',
                            'ils/elles': 'aimèrent'
                        },
                        imparfait: {
                            'j\'': 'aimais',
                            tu: 'aimais',
                            'il/elle/on': 'aimait',
                            nous: 'aimions',
                            vous: 'aimiez',
                            'ils/elles': 'aimaient'
                        },
                        conditionnelPrésent: {
                            'j\'': 'aimerais',
                            tu: 'aimerais',
                            'il/elle/on': 'aimerait',
                            nous: 'aimerions',
                            vous: 'aimeriez',
                            'ils/elles': 'aimeraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'aime',
                            'que tu': 'aimes',
                            'qu\'il/elle/on': 'aime',
                            'que nous': 'aimions',
                            'que vous': 'aimiez',
                            'qu\'ils/elles': 'aiment'
                        },
                        futurProche: {
                            je: 'vais aimer',
                            tu: 'vas aimer',
                            'il/elle/on': 'va aimer',
                            nous: 'allons aimer',
                            vous: 'allez aimer',
                            'ils/elles': 'vont aimer'
                        },
                        passéComposé: {
                            'j\'': 'ai aimé',
                            tu: 'as aimé',
                            'il/elle/on': 'a aimé',
                            nous: 'avons aimé',
                            vous: 'avez aimé',
                            'ils/elles': 'ont aimé'
                        }
                    }
                },
                donner: {
                    type: 'regular',
                    tense: {
                        présent: {
                            je: 'donne',
                            tu: 'donnes',
                            'il/elle/on': 'donne',
                            nous: 'donnons',
                            vous: 'donnez',
                            'ils/elles': 'donnent'
                        },
                        futur: {
                            je: 'donnerai',
                            tu: 'donneras',
                            'il/elle/on': 'donnera',
                            nous: 'donnerons',
                            vous: 'donnerez',
                            'ils/elles': 'donneront'
                        },
                        passé: {
                            je: 'donnai',
                            tu: 'donnas',
                            'il/elle/on': 'donna',
                            nous: 'donnâmes',
                            vous: 'donnâtes',
                            'ils/elles': 'donnèrent'
                        },
                        imparfait: {
                            je: 'donnais',
                            tu: 'donnais',
                            'il/elle/on': 'donnait',
                            nous: 'donnions',
                            vous: 'donniez',
                            'ils/elles': 'donnaient'
                        },
                        conditionnelPrésent: {
                            je: 'donnerais',
                            tu: 'donnerais',
                            'il/elle/on': 'donnerait',
                            nous: 'donnerions',
                            vous: 'donneriez',
                            'ils/elles': 'donneraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'donne',
                            'que tu': 'donnes',
                            'qu\'il/elle/on': 'donne',
                            'que nous': 'donnions',
                            'que vous': 'donniez',
                            'qu\'ils/elles': 'donnent'
                        },
                        futurProche: {
                            je: 'vais donner',
                            tu: 'vas donner',
                            'il/elle/on': 'va donner',
                            nous: 'allons donner',
                            vous: 'allez donner',
                            'ils/elles': 'vont donner'
                        },
                        passéComposé: {
                            'j\'': 'ai donné',
                            tu: 'as donné',
                            'il/elle/on': 'a donné',
                            nous: 'avons donné',
                            vous: 'avez donné',
                            'ils/elles': 'ont donné'
                        }
                    }
                },
                demander: {
                    type: 'regular',
                    tense: {
                        présent: {
                            je: 'demande',
                            tu: 'demandes',
                            'il/elle/on': 'demande',
                            nous: 'demandons',
                            vous: 'demandez',
                            'ils/elles': 'demandent'
                        },
                        futur: {
                            je: 'demanderai',
                            tu: 'demanderas',
                            'il/elle/on': 'demandera',
                            nous: 'demanderons',
                            vous: 'demanderez',
                            'ils/elles': 'demanderont'
                        },
                        passé: {
                            je: 'demandai',
                            tu: 'demandas',
                            'il/elle/on': 'demandera',
                            nous: 'demanderons',
                            vous: 'demanderez',
                            'ils/elles': 'demanderont'
                        },
                        imparfait: {
                            je: 'demandais',
                            tu: 'demandais',
                            'il/elle/on': 'demandait',
                            nous: 'demandions',
                            vous: 'demandiez',
                            'ils/elles': 'demandaient'
                        },
                        conditionnelPrésent: {
                            je: 'demanderais',
                            tu: 'demanderais',
                            'il/elle/on': 'demanderait',
                            nous: 'demanderions',
                            vous: 'demanderiez',
                            'ils/elles': 'demanderaient'
                        },
                        subjonctifPrésent: {
                            'que je': 'demande',
                            'que tu': 'demandes',
                            'qu\'il/elle/on': 'demande',
                            'que nous': 'demandions',
                            'que vous': 'demandiez',
                            'qu\'ils/elles': 'demandent'
                        },
                        futurProche: {
                            je: 'vais demander',
                            tu: 'vas demander',
                            'il/elle/on': 'va demander',
                            nous: 'allons demander',
                            vous: 'allez demander',
                            'ils/elles': 'vont demander'
                        },
                        passéComposé: {
                            'j\'': 'ai demandé',
                            tu: 'as demandé',
                            'il/elle/on': 'a demandé',
                            nous: 'avons demandé',
                            vous: 'avez demandé',
                            'ils/elles': 'ont demandé'
                        }
                    }
                },
                passer: {
                    type: 'regular',
                    tense: {
                        présent: {
                            je: 'passe',
                            tu: 'passes',
                            'il/elle/on': 'passe',
                            nous: 'passons',
                            vous: 'passez',
                            'ils/elles': 'passent'
                        },
                        futur: {
                            je: 'passerai',
                            tu: 'passeras',
                            'il/elle/on': 'passera',
                            nous: 'passerons',
                            vous: 'passerez',
                            'ils/elles': 'passeront'
                        },
                        passé: {
                            je: 'passai',
                            tu: 'passas',
                            'il/elle/on': 'passa',
                            nous: 'passâmes',
                            vous: 'passâtes',
                            'ils/elles': 'passèrent'
                        },
                        imparfait: {
                            je: 'passais',
                            tu: 'passais',
                            'il/elle/on': 'passait',
                            nous: 'passions',
                            vous: 'passiez',
                            'ils/elles': 'passaient'
                        },
                        conditionnelPrésent: {
                            je: 'passerais',
                            tu: 'passerais',
                            'il/elle/on': 'apasserait',
                            nous: 'passerions',
                            vous: 'passeriez',
                            'ils/elles': 'passeraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'passe',
                            'que tu': 'passes',
                            'qu\'il/elle/on': 'passe',
                            'que nous': 'passions',
                            'que vous': 'passiez',
                            'qu\'ils/elles': 'passent'
                        },
                        futurProche: {
                            je: 'vais passer',
                            tu: 'vas passer',
                            'il/elle/on': 'va passer',
                            nous: 'allons passer',
                            vous: 'allez passer',
                            'ils/elles': 'vont passer'
                        },
                        passéComposé: {
                            'j\'': 'ai passé',
                            tu: 'as passé',
                            'il/elle/on': 'a passé',
                            nous: 'avons passé',
                            vous: 'avez passé',
                            'ils/elles': 'ont passé'
                        }
                    }
                },
                rester: {
                    type: 'regular',
                    tense: {
                        présent: {
                            je: 'reste',
                            tu: 'restes',
                            'il/elle/on': 'reste',
                            nous: 'restons',
                            vous: 'restez',
                            'ils/elles': 'restent'
                        },
                        futur: {
                            je: 'resterai',
                            tu: 'resteras',
                            'il/elle/on': 'restera',
                            nous: 'resterons',
                            vous: 'resterez',
                            'ils/elles': 'resteront'
                        },
                        passé: {
                            je: 'restai',
                            tu: 'restas',
                            'il/elle/on': 'resta',
                            nous: 'restâmes',
                            vous: 'restâtes',
                            'ils/elles': 'restèrent'
                        },
                        imparfait: {
                            je: 'restais',
                            tu: 'restais',
                            'il/elle/on': 'restait',
                            nous: 'restions',
                            vous: 'restiez',
                            'ils/elles': 'restaient'
                        },
                        conditionnelPrésent: {
                            je: 'resterais',
                            tu: 'resterais',
                            'il/elle/on': 'resterait',
                            nous: 'resterions',
                            vous: 'resteriez',
                            'ils/elles': 'resteraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'reste',
                            'que tu': 'restes',
                            'qu\'il/elle/on': 'reste',
                            'que nous': 'restions',
                            'que vous': 'restiez',
                            'qu\'ils/elles': 'restent'
                        },
                        futurProche: {
                            je: 'vais rester',
                            tu: 'vas rester',
                            'il/elle/on': 'va rester',
                            nous: 'allons rester',
                            vous: 'allez rester',
                            'ils/elles': 'vont rester'
                        },
                        passéComposé: {
                            'j\'': 'ai resté',
                            tu: 'as resté',
                            'il/elle/on': 'a resté',
                            nous: 'avons resté',
                            vous: 'avez resté',
                            'ils/elles': 'ont resté'
                        }
                    }
                },
                arriver: {
                    type: 'regular',
                    tense: {
                        présent: {
                            'j\'': 'arrive',
                            tu: 'arrives',
                            'il/elle/on': 'arrive',
                            nous: 'arrivons',
                            vous: 'arrivez',
                            'ils/elles': 'arrivent'
                        },
                        futur: {
                            'j\'': 'arriverai',
                            tu: 'arriveras',
                            'il/elle/on': 'arrivera',
                            nous: 'arriverons',
                            vous: 'arriverez',
                            'ils/elles': 'arriveront'
                        },
                        passé: {
                            'j\'': 'arrivai',
                            tu: 'arrivas',
                            'il/elle/on': 'arriva',
                            nous: 'arrivâmes',
                            vous: 'arrivâtes',
                            'ils/elles': 'arrivèrent'
                        },
                        imparfait: {
                            'j\'': 'arrivais',
                            tu: 'arrivais',
                            'il/elle/on': 'arrivait',
                            nous: 'arrivions',
                            vous: 'arriviez',
                            'ils/elles': 'arrivaient'
                        },
                        conditionnelPrésent: {
                            'j\'': 'arriverais',
                            tu: 'arriverais',
                            'il/elle/on': 'arriverait',
                            nous: 'arriverions',
                            vous: 'arriveriez',
                            'ils/elles': 'arriveraient'
                        },
                        subjonctifPrésent: {
                            'que j\'': 'arrive',
                            'que tu': 'arrives',
                            'qu\'il/elle/on': 'arrive',
                            'que nous': 'arrivions',
                            'que vous': 'arriviez',
                            'qu\'ils/elles': 'arrivent'
                        },
                        futurProche: {
                            je: 'vais arriver',
                            tu: 'vas arriver',
                            'il/elle/on': 'va arriver',
                            nous: 'allons arriver',
                            vous: 'allez arriver',
                            'ils/elles': 'vont arriver'
                        },
                        passéComposé: {
                            'j\'': 'ai arrivé',
                            tu: 'as arrivé',
                            'il/elle/on': 'a arrivé',
                            nous: 'avons arrivé',
                            vous: 'avez arrivé',
                            'ils/elles': 'ont arrivé'
                        }
                    }
                },
                entrer: {
                    type: 'regular',
                    tense: {
                        présent: {
                            'j\'': 'entre',
                            tu: 'entres',
                            'il/elle/on': 'entre',
                            nous: 'entrons',
                            vous: 'entrez',
                            'ils/elles': 'entrent'
                        },
                        futur: {
                            'j\'': 'entrerai',
                            tu: 'entreras',
                            'il/elle/on': 'entrera',
                            nous: 'entrerons',
                            vous: 'entrerez',
                            'ils/elles': 'entreront'
                        },
                        passé: {
                            'j\'': 'entrai',
                            tu: 'entras',
                            'il/elle/on': 'entra',
                            nous: 'entrâmes',
                            vous: 'entrâtes',
                            'ils/elles': 'entrèrent'
                        },
                        imparfait: {
                            'j\'': 'entrais',
                            tu: 'entrais',
                            'il/elle/on': 'entrait',
                            nous: 'entrions',
                            vous: 'entriez',
                            'ils/elles': 'entraient'
                        },
                        conditionnelPrésent: {
                            'j\'': 'entrerais',
                            tu: 'entrerais',
                            'il/elle/on': 'entrerait',
                            nous: 'entrerions',
                            vous: 'entreriez',
                            'ils/elles': 'entreraient'
                        },
                        subjonctifPrésent: {
                            'que j\'': 'entre',
                            'que tu': 'entres',
                            'qu\'il/elle/on': 'entre',
                            'que nous': 'entrions',
                            'que vous': 'entriez',
                            'qu\'ils/elles': 'entrent'
                        },
                        futurProche: {
                            je: 'vais entrer',
                            tu: 'vas entrer',
                            'il/elle/on': 'va entrer',
                            nous: 'allons entrer',
                            vous: 'allez entrer',
                            'ils/elles': 'vont entrer'
                        },
                        passéComposé: {
                            'j\'': 'ai entré',
                            tu: 'as entré',
                            'il/elle/on': 'a entré',
                            nous: 'avons entré',
                            vous: 'avez entré',
                            'ils/elles': 'ont entré'
                        }
                    }
                },
                sortir: {
                    type: 'irregular',
                    tense: {
                        présent: {
                            je: 'sors',
                            tu: 'sors',
                            'il/elle/on': 'sort',
                            nous: 'sortons',
                            vous: 'sortez',
                            'ils/elles': 'sortent'
                        },
                        futur: {
                            je: 'sortirai',
                            tu: 'sortiras',
                            'il/elle/on': 'sortira',
                            nous: 'sortirons',
                            vous: 'sortirez',
                            'ils/elles': 'sortiront'
                        },
                        passé: {
                            je: 'sortis',
                            tu: 'sortis',
                            'il/elle/on': 'sortit',
                            nous: 'sortîmes',
                            vous: 'sortîtes',
                            'ils/elles': 'sortirent'
                        },
                        imparfait: {
                            je: 'sortais',
                            tu: 'sortais',
                            'il/elle/on': 'sortait',
                            nous: 'sortions',
                            vous: 'sortiez',
                            'ils/elles': 'sortaient'
                        },
                        conditionnelPrésent: {
                            je: 'sortirais',
                            tu: 'sortirais',
                            'il/elle/on': 'sortirait',
                            nous: 'sortirions',
                            vous: 'sortiriez',
                            'ils/elles': 'sortiraient'
                        },
                        subjonctifPrésent: {
                            'que je': 'sorte',
                            'que tu': 'sortes',
                            'qu\'il/elle/on': 'sorte',
                            'que nous': 'vions',
                            'que vous': 'sortiez',
                            'qu\'ils/elles': 'aientent'
                        },
                        futurProche: {
                            je: 'vais sortir',
                            tu: 'vas sortir',
                            'il/elle/on': 'va sortir',
                            nous: 'allons sortir',
                            vous: 'allez sortir',
                            'ils/elles': 'vont sortir'
                        },
                        passéComposé: {
                            'j\'': 'ai sorti',
                            tu: 'as sorti',
                            'il/elle/on': 'a sorti',
                            nous: 'avons sorti',
                            vous: 'avez sorti',
                            'ils/elles': 'ont sorti'
                        }
                    }
                },
            }
        }
        var verb = '';
        var tense = '';
        var pronoun = '';
        var answer = '';
        var oefeningenCorrect = 0;
        var oefeningenGedaan = 0;
        var activeTenses = [];
        var activeVerbes = [];
        document.getElementById('startTestButton').addEventListener('click', function(){
            verb = '';
            tense = '';
            pronoun = '';
            answer = '';
            oefeningenCorrect = 0;
            oefeningenGedaan = 0;
            //tenses
            var querySelectorTensesElements = document.getElementById('tijdenForm').querySelectorAll('input[type="checkbox"]:checked');
            activeTenses = [];
            querySelectorTensesElements.forEach(element => {
                activeTenses.push(element.id);
            });
            //Verbes
            var querySelectorVerbesIrréguliers = document.getElementById('verbesIrréguliersForm').querySelectorAll('input[type="checkbox"]:checked');
            var querySelectorVerbesRéguliers = document.getElementById('verbesRéguliersForm').querySelectorAll('input[type="checkbox"]:checked');
            activeVerbes = [];
            querySelectorVerbesIrréguliers.forEach(element => {
                activeVerbes.push(element.id);
            });
            querySelectorVerbesRéguliers.forEach(element => {
                activeVerbes.push(element.id);
            });
            //extra Opties
            accentGevoeligHeid = document.getElementById('accentgevoeligheid').checked;
            skipOnWrongAnswer = document.getElementById('skipOnWrong').checked;
            hideResult = document.getElementById('hideResult').checked;
            amountOfExcercises = document.getElementById('amountOfExcercises').value;
            if(activeTenses.length > 0 && activeVerbes.length > 0 && amountOfExcercises > 0){
                document.getElementById('exerciseForm').classList.add('hidden');
                document.getElementById('conjugaisonTest').classList.remove('hidden');
                document.getElementById('oefeningen').innerHTML = ('0 / ' + amountOfExcercises);
                getExcercise(activeVerbes, activeTenses);
            }else{
                alert('Niet alle verplichte opties zijn aangeduid. (Verplichte opties zijn: temps, verbes  en aantal oefeningen moet minstens 1 zijn.)')
            }
        });

        document.getElementById('inputExcerciseForm').addEventListener('submit', function(event){
            event.preventDefault();
            input = document.getElementById('inputConjugation').value;
            console.log(input);
            document.getElementById('inputConjugation').value = ''
            result = checkInput(input, answer);
            oefeningenGedaan++
            document.getElementById('oefeningen').innerHTML = oefeningenGedaan + ' / ' + amountOfExcercises;
            if(!hideResult){
                if(result){
                    document.getElementById('juistOfFout').innerHTML = 'Juist';
                }else{
                    document.getElementById('juistOfFout').innerHTML = 'Fout';
                }
                document.getElementById('correctPercentage').innerHTML = ((oefeningenCorrect / oefeningenGedaan).toFixed(2) * 100) + '%';
                document.getElementById('vorigeVraag').innerHTML = pronoun + ': ('  + verb + ')' + ' | ' + tense;
                document.getElementById('vorigInput').innerHTML = input;
                document.getElementById('vorigAntwoord').innerHTML = answer;
            }
            if(oefeningenGedaan < amountOfExcercises){
                getExcercise(activeVerbes, activeTenses);
            }else{
                document.getElementById('inputConjugation').disabled = true;
                alert('finished')
            }
        });

        function checkInput(input, answer){
            input = input.trim();
            input = input.toLowerCase();
            answer = answer.toLowerCase();
            if(!accentGevoeligHeid){
                input = String(input);
                input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                answer = String(answer);
                answer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }
            if(input == answer){
                oefeningenCorrect++;
                return true;
            }else{
                return false;
            }

        };

        function getExcercise(activeVerbes, activeTenses){
            //Random Verb
            const randomVerbInt = activeVerbes[getRandomInt(0, activeVerbes.length)];
            const randomVerb = verbLibrary.verbs[randomVerbInt];
            //Random Tense
            const randomTenseInt = activeTenses[getRandomInt(0, activeTenses.length)];
            const randomTense = randomVerb.tense[randomTenseInt];
            //All possible pronouns from the selected tense
            const pronouns = Object.keys(randomTense);
            //random pronoun
            const randomPronoun = pronouns[getRandomInt(0, pronouns.length)];
            

            // console.log(`${randomPronoun}: ${randomTense[randomPronoun]}`)
            document.getElementById('tense').innerHTML = randomTenseInt;
            document.getElementById('verbe').innerHTML = randomVerbInt;
            document.getElementById('pronoun').innerHTML = randomPronoun;
            tense = randomTenseInt;
            verb = randomVerbInt;
            pronoun = randomPronoun;
            answer = randomTense[randomPronoun];
        };
    }
//--------------End Vocabulaire--------------//
});

//-----------------functies------------------//
//----------------Vocabulaire----------------//
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};
//----------------Conjugaison----------------//