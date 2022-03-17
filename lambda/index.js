/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
let started = false;
const chairPositions = ["fundo", "meio", "frente"];
const chairLetters = "ABCBDEFGHIJKLMNOPQRSTUVWXYZ";
let chairPosition = chairPositions[0];
let isWindow = false;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Oi, você está falando com o Céu. Assistente virtual da Azul. Diga começar para escutar as opções ou diga ajuda a qualquer momento.';
        started = false;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const StartIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        
        if (!started) {
            speakOutput = 'Para sua segurança, a Azul não solicita senhas, dados de cartão ou pedidos de confirmação de dados pessoais por mensagens. Pronto, ';
            started = true;
        }
        
        
        speakOutput += 'Vamos lá, eu posso consultar o status do seu vôo; realizar ou remover chequin, marcar assentos e antecipar seu vôo. Ah! Também posso esclarecer dúvidas relacionadas a cancelamento, alteração, bagagem, programa tudo azul e crédito azul. Como posso te ajudar?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('O que você quer: Realizar chequin ou tirar dúvidas sobre bagagem?')
            .getResponse();
    }
};

const ContinueOrFinishIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContinueOrFinishIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Diga continuar para ver outros assuntos ou terminar para encerrar seu atendimento.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga continuar para ver mais opções ou terminar para encerrar seu atendimento')
            .getResponse();
    }
};

const BagagemIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BagagemIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Pra te falar a quantidade de bagagens que você pode levar, preciso saber se Você é cliente Tudo Azul, pra isso diga: Sou tudo azul ou diga: não sou tudo azul.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Pode falar: Sou tudo azul ou diga: não sou tudo azul?')
            .getResponse();
    }
};

const DetalheBagagemIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DetalheBagagemIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Vamos lá, na Azul você tem direito à levar as seguintes bagagens em todas as categorias: um artigo pessoal e uma bagagem de mão, isso vale pra todos. Agora se sua passagem é Mais Azul: Você também pode despachar uma bagagem de até 23 quilos; já para passagens Azul Super você pode despachar duas bagagens de 23 quilos, e para os clientes bisnes, você pode despachar 3 bagagens de 23 quilos. Pronto, agora diga continuar pra ver mais opções ou diga terminar para finalizar nosso voo virtual por aqui.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga continuar, para ver mais ou opções ou terminar para finalizar')
            .getResponse();
    }
};

const CheckInIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckInIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'posso te ajudar com chequin de voos domésticos, um cliente por vez e sem transações financeiras. preciso saber como vamos encontrar sua reserva, diga código da reserva, ou diga documento pessoal ou diga número tudo azul';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga código da reserva, ou diga documento pessoal ou diga número tudo azul')
            .getResponse();
    }
};

const DocumentoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DocumentoIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Ótimo, Agora diga o número do seu documento para eu buscar sua reserva aqui';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga código da reserva, ou diga documento pessoal ou diga número tudo azul')
            .getResponse();
    }
};

const IdDocumentoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IdDocumentoIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Encontrei sua reserva aqui, com o localizador RKSZ6K, no dia 25 de fevereiro, voo 4350 de vira copos, são paulo para santos dumont, rio de janeiro. Muito bem, deseja selecionar um assento? Diga selecionar assento ou não selecionar assento para continuar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga continuar, para ver mais ou opções ou terminar para finalizar')
            .getResponse();
    }
};

const CheckinConfirmPositiveIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckinConfirmPositiveIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Muito bem, seu chequin foi efetuado com sucesso. Agora diga continuar pra ver mais opções ou diga terminar para finalizar nosso voo virtual por aqui.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga continuar para ver mais ou opções ou terminar para finalizar')
            .getResponse();
    }
};

const CancelCheckinFinishIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CancelCheckinFinishIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Tudo bem, acabei de cancelar seu chequinin. Agora diga continuar pra ver mais opções ou diga terminar para finalizar nosso voo virtual por aqui.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Vamos lá, diga continuar para ver mais opções ou terminar para finalizar seu atendimento.')
            .getResponse();
    }
};

const AntecipateFlightIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AntecipateFlightIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Para quando deseja antecipar seu voo?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Bem, preciso saber para qual dia deseja antecipar seu voo. Você tem algum dia em mente?')
            .getResponse();
    }
};

const AntecipateFlightConfirmationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AntecipateFlightConfirmationIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Tem certeza de que deseja antecipar seu voo para este dia? Diga confirmar antecipação caso positivo ou cancelar antecipação caso tenha desistido.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Por favor confirme se possui certeza de que deseja antecipar seu para este dia. Diga desejo antecipar caso positivo ou não desejo para caso tenha desistido.')
            .getResponse();
    }
};

const AntecipateFlightFinishIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AntecipateFlightFinishIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Voo antecipado com sucesso para hoje. Fale se deseja continuar ou terminar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CheckinConfirmNegativeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckinConfirmNegativeIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Ok, deseja continuar seu atendimento? Se sim, diga continuar, se não, diga terminar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Por favor, informe como mais posso te ajudar. Se deseja continuar seu atendimento, diga continuar, se não, diga terminar.')
            .getResponse();
    }
};

const CancelCheckinConfirmationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CancelCheckinConfirmationIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Tem certeza de que deseja cancelar seu chequin? Se sim, diga confirmar cancelamento. Se não, diga não cancelar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Por favor confirme que tem certeza de que deseja cancelar seu chequin. Se sim, diga cancelar. Se não, diga não cancelar.')
            .getResponse();
    }
};

const FlightStatusIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FlightStatusIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Seu voo está confirmado para hoje, às 23 horas. Fale continuar para mais opções ou terminar.';

        return handlerInput.responseBuilder
            .reprompt('Por favor, informe como mais posso te ajudar. Se deseja continuar seu atendimento, diga continuar, se não, diga terminar.')
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Para demais dúvidas, por favor entrar em contato conosco através do nosso 0 800, anote: 0 800 8 8 7, 11 18. Ou através do nosso site: www.voeazul.com.br. Você pode dizer começar pra ver as opções e depois é só seguir as instruções.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Terminamos nosso voo virtual, que você tenha um dia Azul! Até logo';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ChooseChairQuestionIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseChairQuestionIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Onde deseja sentar? Diga frente, meio ou fundo para escolher.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Por favor, informe onde deseja sentar. Diga frente, meio ou fundo para escolher um local.')
            .getResponse();
    }
};

const ChooseBackChairIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseBackChairIntent';
    },
    handle(handlerInput) {
        chairPosition = chairPositions[0];
        let speakOutput = buildChairPositionPhrase(chairPosition);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ChooseMiddleChairIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseMiddleChairIntent';
    },
    handle(handlerInput) {
        chairPosition = chairPositions[1];
        let speakOutput = buildChairPositionPhrase(chairPosition);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(" Vamor lá, " + speakOutput)
            .getResponse();
    }
};

const ChooseFrontChairIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseFrontChairIntent';
    },
    handle(handlerInput) {
        chairPosition = chairPositions[2];
        let speakOutput = buildChairPositionPhrase(chairPosition);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(" Vamor lá, " + speakOutput)
            .getResponse();
    }
};

const ChooseNotWindowChairIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseNotWindowChairIntent';
    },
    handle(handlerInput) {
        isWindow = false;
        let speakOutput = buildChairIsWindowPhrase(isWindow);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(" Vamor lá, " + speakOutput)
            .getResponse();
    }
};

const ChooseWindowChairIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseWindowChairIntent';
    },
    handle(handlerInput) {
        isWindow = true;
        let speakOutput = buildChairIsWindowPhrase(isWindow);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(" Vamor lá, " + speakOutput)
            .getResponse();
    }
};

const buildChairPositionPhrase = (position) => {
    return `Ótimo, você selecionou ${position}; agora me fale se quer corredor ou janela para continuarmos com sua reserva de assento.`
}

const buildChairIsWindowPhrase = (isChairOnWindow) => {
    const sortedIndex = Math.floor(Math.random() * chairLetters.length);
    const randomLetter = chairLetters[sortedIndex];
    const randomNumber = Math.floor(Math.random() * 100);
    return `Tudo bem. Você escolheu ${chairPosition} e ${isChairOnWindow ? "janela" : "corredor"}. Seu assento é o ${randomNumber}${randomLetter}. Diga confirmar assento ou escolher outro assento para continuar.`
}
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Poxa, falha minha, eu não entendi bem o que você quiz dizer. Pode tentar falar novamente?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você disse ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Opa, alguma coisa deu errada. Diga a última opção novamente pra eu tentar de novo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartIntentHandler,
        BagagemIntentHandler,
        DetalheBagagemIntentHandler,
        CheckInIntentHandler,
        DocumentoIntentHandler,
        IdDocumentoIntentHandler,
        CheckinConfirmPositiveIntentHandler,
        AntecipateFlightIntentHandler,
        AntecipateFlightConfirmationIntentHandler,
        AntecipateFlightConfirmationIntentHandler,
        AntecipateFlightFinishIntentHandler,
        CheckinConfirmNegativeIntentHandler,
        CancelCheckinConfirmationIntentHandler,
        FlightStatusIntentHandler,
        ChooseChairQuestionIntentHandler,
        ChooseBackChairIntentHandler,
        ChooseMiddleChairIntentHandler,
        ChooseFrontChairIntentHandler,
        ChooseNotWindowChairIntentHandler,
        ChooseWindowChairIntentHandler,
        CancelCheckinFinishIntentHandler,
        HelpIntentHandler,
        ContinueOrFinishIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('avanade/ajuda-azul/v1.0')
    .lambda();