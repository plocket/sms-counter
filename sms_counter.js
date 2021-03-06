

// ==UserScript==
// @name         Count SMS Messages on GYR Hub
// @namespace    http://getyourrefund.org/
// @version      0.1
// @description  Type text in the textarea to see how many text messages you will be sending.
// @match        https://*.getyourrefund.org/en/hub/clients/*/documents
// @grant        none
// ==/UserScript==
javascript: (function () {

  // If this element is already on the page, don't do anything
  var count_container = document.getElementById( 'gyr_message_counter' );
  if ( count_container ) {
    if ( count_container.style.display !== "none" ) {
      count_container.style.display = "none";
    } else {
      count_container.style.display = "block";
    }
    return;
  }

  // Otherwise add the message counter element to the page
  var gyrContainer = document.querySelector( '.text-message-form .form-group' );
  console.log(`The text area on the messages screen is: ${ gyrContainer }`);
  if (gyrContainer === null) {
    // Could be on the "Take Action" page
    gyrContainer = document.querySelector( '#hub_take_action_form_message_body' ).parentElement;
    console.log(`The text area on the Take Action screen is: ${ gyrContainer }`)
  }

  var countContainer = document.createElement( 'div' );
  countContainer.id = 'gyr_message_counter';
  gyrContainer.appendChild( countContainer );

  var numMsgsContainer = document.createElement( 'div' );
  numMsgsContainer.id = 'message_count_container';
  countContainer.appendChild( numMsgsContainer );

  var msgText = document.createElement( 'span' );
  numMsgsContainer.appendChild( msgText );
  msgText.innerHTML = 'Number of messages this will create: ';
  
  var numMsgsNode = document.createElement( 'span' );
  numMsgsNode.id = 'gyr_num_messages_value';
  numMsgsContainer.appendChild( numMsgsNode );
  numMsgsContainer.style.fontWeight = 'bold';

  var numCharsContainer = document.createElement( 'div' );
  numCharsContainer.id = 'char_count_container';
  countContainer.appendChild( numCharsContainer );
  
  var charsText = document.createElement( 'span' );
  charsText.innerHTML = 'Number of characters: ';
  numCharsContainer.appendChild( charsText );

  var numCharsNode = document.createElement( 'span' );
  numCharsNode.id = 'gyr_num_chars_value';
  numCharsContainer.appendChild( numCharsNode );

  // Change the count when the msgText field value changes
  var gyr_calc_num_messages = function ( event ) {
    var num = event.target.value.length;
    numCharsNode.innerText = num;

    msg_length = 160;
    if ( num > 160 ) {
      msg_length = 147;
    }
    numMsgsNode.innerText = `${Math.ceil(num / msg_length)} (${msg_length - (num % msg_length)} characters till next message)`
  }

  var textarea = document.getElementById( 'outgoing_text_message_body' );
  if (textarea === null) {
    // Could be on the "Take Action" page
    textarea = document.getElementById( 'hub_take_action_form_message_body' );
  }
  
  gyr_calc_num_messages({ target: textarea });  // Text might already be in the text area
  textarea.addEventListener( 'input', gyr_calc_num_messages );


  // Styles
  var counter_styles = document.createElement( 'style' );
  counter_styles.innerHTML = `
  #message_count_container { font-weight: bold; }
  `
})();
