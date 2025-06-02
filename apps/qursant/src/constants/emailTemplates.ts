export const getReservationEmailTemplate = ({
  name,
  month,
}: {
  name: string;
  month: string;
}) => {
  if (!name || !month) {
    console.error('Brakujące parametry w getReservationEmailTemplate:', {
      name,
      month,
    });
    throw new Error('Brakujące parametry w szablonie email');
  }

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial;
  box-sizing: border-box;
  font-size: 14px;
}

.coupon {
  border: 5px inset #0082FA;
  width: 90%;
  border-radius: 15px;
  margin: 0 auto;
  max-width: 600px;
  box-shadow: 3px 4px 10px #222;
  padding: 7px;
}

.container {
  padding: 2px 16px;
  background-color: #f1f1f1;
  border-radius: 15px;
  margin-bottom: 10px;
}

.data-row {
  background-color: white;
  padding: 0 10px;
  border-radius: 10px;
  margin: 0 0;
}

.highlight {
  color: #0052FA;
  font-weight: bold;
}

.divider {
  border-top: 2px dashed #0082FA;
  margin: 10px 0;
}

.hide {
  color: #0052FA;
}

.divButton {
  margin: 0 37% 5px;
  padding: 10px 10px;
  border-radius: 15px;
  background-image: linear-gradient(to right,#0AB3FD,#0052FA);
  font-size: 16px;
  outline: none;
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}

#lukkoli, #Lukkoli {
  visibility: visible;
}

.zero {
  visibility: hidden;
}

a.buttonLukkoli {
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}

#divButton:hover {
  cursor: pointer;
}

@keyframes glowing {
  0% { box-shadow: 3px 4px -10px #2229; }
  40% { box-shadow: 3px 4px 10px #2229; }
  60% { box-shadow: 3px 4px 10px #2229; }
  100% { box-shadow: 3px 4px -10px #2229; }
}

.button-glow {
  animation: glowing 7000ms infinite;
}
</style>
</head>
<body>

<div class="coupon">
  <div class="container">
    <h3><img src="https://www.qursant.com.pl/logo/logo-white.png" alt="Szkoła jazdy Qursant" style="width:auto; height:60px"></h3>
  </div>
  
  <div class="container" style="background-color:white">
    <h2><b>Witaj ${name}! 🎉</b></h2>
    
    <div class="data-row">
      <p>Twoja rezerwacja w naszej szkole jazdy została potwierdzona.</p>
      <p><b>Rezerwacja na ${month}</b> będzie aktywna dodatkowo jeszcze tylko <b>14 dni w następnym miesiącu.</b></p>
    </div>
      <div class="divider"></div>
    
    <div class="data-row">
    
      <p><strong>Data rezerwacji:</strong> <span class="highlight">${new Date().toLocaleString(
        'pl-PL'
      )}</span></p>
      </div>
      
      
      
      <div class="container">
      <p style="text-align: center; font-size: 14px;">
        <b>Kontakt:</b> <a href="mailto:langer.biuro@poczta.fm">langer.biuro@poczta.fm</a>
      </p>
        <p class="expire" style="text-align: center;"><b><u>Rezerwacja: ${month}</u></b></p>
      </div>
</div>

</body>
</html>
`;
};

export const getAdminEmailTemplate = ({
  name,
  email,
  phone,
  month,
}: {
  name: string;
  email: string;
  phone: string;
  month: string;
}) => {
  if (!name || !email || !phone || !month) {
    console.error('Brakujące parametry w getAdminEmailTemplate:', {
      name,
      email,
      phone,
      month,
    });
    throw new Error('Brakujące parametry w szablonie email');
  }

  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial;
  box-sizing: border-box;
  font-size: 14px;
}

.coupon {
  border: 5px inset #0082FA;
  width: 90%;
  border-radius: 15px;
  margin: 0 auto;
  max-width: 600px;
  box-shadow: 3px 4px 10px #222;
  padding: 7px;
}

.container {
  padding: 2px 16px;
  background-color: #f1f1f1;
  border-radius: 15px;
  margin-bottom: 10px;
}

.data-row {
  background-color: white;
  padding: 0 10px;
  border-radius: 10px;
  margin: 0 0;
}

.highlight {
  color: #0052FA;
  font-weight: bold;
}

.divider {
  border-top: 2px dashed #0082FA;
  margin: 10px 0;
}

</style>
</head>
<body>

<div class="coupon">
  <div class="container">
    <h3><img src="https://www.qursant.com.pl/logo/logo-white.png" alt="Szkoła jazdy Qursant" style="width:auto; height:60px"></h3>
  </div>
  
  <div class="container" style="background-color:white">
    <h2><b>Nowy Qursant na pokładzie! 🎉</b></h2>
    <div class="data-row">
      <p><strong>Imię i nazwisko:</strong> <span class="highlight">${name}</span></p>
    </div>
    <div class="data-row">
      <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
    </div>
    <div class="data-row">
      <p><strong>Telefon:</strong> <span class="highlight">${phone}</span></p>
    </div>
    <div class="divider"></div>
    <div class="data-row">
      <p><strong>Preferowany termin rozpoczęcia kursu:</strong> <span class="highlight">${month}</span></p>
      <p><strong>Data rezerwacji:</strong> <span class="highlight">${new Date().toLocaleString(
        'pl-PL'
      )}</span></p>
    </div>
  </div>

  <div class="container">
    <p style="text-align: center; font-size: 12px; color: #666;">
      Aby odpowiedzieć kursantowi, użyj adresu email: <a href="mailto:${email}">${email}</a>
    </p>
  </div>
</div>

</body>
</html>
`;
};
