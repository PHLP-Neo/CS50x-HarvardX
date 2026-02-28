document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
  
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  //console.log("This function is called")
  document.querySelector('form').onsubmit = () => {
    //console.log("This function is called")
    const compose_recipents = document.querySelector("#compose-recipients").value;
    const compose_subject = document.querySelector("#compose-subject").value;
    const compose_body = document.querySelector("#compose-body").value;
    //alert(`I have found this\nRecipents Name: ${compose_recipents}\nSubjects${compose_subject}\nBody:${compose_body}`);
    
    // console.log(`recipients: ${compose_recipents}\n
    //   subject: ${compose_subject}\n
    //   body: ${compose_body}`)

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: compose_recipents,
        subject: compose_subject,
        body: compose_body
      })
    })
      .then(response => response.json())
      .then(result => {
        // Print result
        console.log(result);
      });

    //load_mailbox('inbox');
    //return false;


    /*
    How to post stuff

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: 'baz@example.com',
          subject: 'Meeting time',
          body: 'How about we meet tomorrow at 3pm?'
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });
    */
  }

  
  
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //alert("Inside this function");


  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);
      //alert("Inside fetch function")
      // ... do something else with emails ...
      if (emails.length === 0) {
        No_email = document.createElement("H4");
        No_email.innerHTML = "You dont have any email.";
        document.querySelector("#emails-view").appendChild(No_email);
      } else {
        response_table = document.createElement("table");
        entry = document.createElement("tr");
        sender = document.createElement("td");
        sender.innerHTML = '<b>Sender</b>';
        //sender.style.
        entry.appendChild(sender);
        subject = document.createElement("td");
        subject.innerHTML = "<b>Subject</b>";
        entry.appendChild(subject);
        response_table.appendChild(entry);
        // for (let i = 0; i < emails.length; i++){
        //document.querySelector("#emails-view").innerHTML = "You have email, I am working on displaying it."
        for (let i = 0; i < emails.length; i++) {
          let email = emails[i];
          entry = document.createElement("tr");
          entry.setAttribute('data-id', email['id'])
          sender = document.createElement("td");
          sender.innerHTML = email['sender'];
          entry.appendChild(sender);
          subject = document.createElement("td");
          hyperlink = document.createElement('div');
          hyperlink.innerHTML = email['subject'];
          //hyperlink.setAttribute('data-id',email['id'])
          entry.addEventListener('click', function(event) {
            //alert(`The id of this html is ${event.currentTarget.dataset.id}!`)
            document.querySelector('table').style.display = 'none';
            fetch(`/emails/${event.currentTarget.dataset.id}`)
            .then(response => response.json())
            .then(email => {
              fetch(`/emails/${email['id']}`, {
                method: 'PUT',
                body: JSON.stringify({
                  read: true
                })
              })
              console.log(email);
              //alert ("individual email called");
              email_sender = document.createElement("p");
              email_sender.innerHTML = `<b>From:</b> ${email['sender']}`
              document.querySelector('#emails-view').appendChild(email_sender);
              email_recipents = document.createElement("p");
              email_recipents.innerHTML = `<b>To:</b> ${email['recipients']}`
              document.querySelector('#emails-view').appendChild(email_recipents);
              email_subject = document.createElement("p");
              email_subject.innerHTML = `<b>Subject:</b> ${email['subject']}`
              document.querySelector('#emails-view').appendChild(email_subject);
              email_time = document.createElement("p");
              email_time.innerHTML = `<b>Timestamp:</b> ${email['timestamp']}`
              document.querySelector('#emails-view').appendChild(email_time);
              reply = document.createElement("button");
              reply.innerHTML = 'Reply';
              //class="btn btn-sm btn-outline-primary"
              reply.setAttribute('class' , "btn btn-sm btn-outline-primary")
              document.querySelector('#emails-view').appendChild(reply);
              //linebreak = 
              document.querySelector('#emails-view').appendChild(document.createElement('hr'));
              body_text = document.createElement('p');
              body_text.innerHTML = `${email['body']}`
              document.querySelector('#emails-view').appendChild(body_text);
            })
          });
          subject.appendChild(hyperlink)
          entry.appendChild(subject);
          response_table.appendChild(entry);
          if (email['read']){
            entry.style.color = 'gray'
          }
        }
        document.querySelector("#emails-view").appendChild(response_table);
        document.querySelector("#emails-view").style.fontSize = "20px";
        cells = document.querySelectorAll('td');
        cells.forEach(element => {
          element.style.borderBottom = "1px solid black";
          element.style.padding = "5px";
        });
          // }
      }
    });
}