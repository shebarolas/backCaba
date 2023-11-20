const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'Gmail',
      auth: {
        user: 'cafeteriacabanaseluney@gmail.com',
        pass: 'zxjcrxfrqpiuvxpw',
      },
    })
  );

const sendEmail = async (req, res) => {
    
   const { email,nombre,apellidos, rut, telefono, cabañas, dias ,personas,fecha,checkIn,  valor, mascotas } = req.body;
   console.log(req.body);
  

   if(email == '' || nombre == '' || apellidos == '' || rut == '' || telefono == '' || cabañas == '' || dias == '' || personas == '' || fecha == '' || checkIn == '' || valor == ''){
      return res.status(500).json({
        message: 'Existen campos vacios, verifique que todos los campos esten completados'
      });
   }else{
            const html = `
            <span> Email : ${email}</span>
            <br/>
            <span> Nombre : ${nombre}</span>
            <br/>
            <span> Apellido : ${apellidos}</span>
            <br/>
            <span> Rut : ${rut}</span>
            <br/>
            <span> Telefono : ${telefono}</span>
            <br/>
            <span>Cabaña : ${cabañas}</span>
            <br/>
            <span>Cantidad de Personas : ${personas}</span>
            <br/>
            <span>Fecha: ${fecha}</span>
            <br/>
            <span>Valor Estimado : ${valor}</span>
            <br/>
            <span>Horario de Check In : ${checkIn}</span>
            <br/>
            <span>Mascotas : ${mascotas ? "Viene con mascotas" : "No viene con mascotas" }</span>
            <br/>
            <span>Cantidad de Noches: ${dias}</span>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3>
              Dentro de 24 horas se le enviará un correo de confirmación sobre para el arriendo de la cabaña, 
              donde vendra la información del metodo de pago y demás, el valor real de la cabaña vendra en el correo de confirmación.
            </h3>
        `;

        const html2 = `
            <span> Email : ${email}</span>
            <br/>
            <span> Nombre : ${nombre}</span>
            <br/>
            <span> Apellido : ${apellidos}</span>
            <br/>
            <span> Rut : ${rut}</span>
            <br/>
            <span> Telefono : ${telefono}</span>
            <br/>
            <span>Cabaña : ${cabañas}</span>
            <br/>
            <span>Cantidad de Personas : ${personas}</span>
            <br/>
            <span>Fecha: ${fecha}</span>
            <br/>
            <span>Valor Estimado : ${valor}</span>
            <br/>
            <span>Horario de Check In : ${checkIn}</span>
            <br/>
            <span>Mascotas : ${mascotas ? "Viene con mascotas" : "No viene con mascotas" }</span>
            <br/>
            <span>Cantidad de Noches: ${dias}</span>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        `;


        const mailOptions = {
            from: 'cafeteriacabanaseluney@gmail.com',
            to: `${email}`,
            subject: `Arriendo Cabaña ${cabañas}`,
            html: html
          };
          const mailOptions1 = {
            from: 'cafeteriacabanaseluney@gmail.com',
            to: `${email}`,
            subject: `Arriendo Cabaña ${cabañas}`,
            html: html2
          };
          
          try {
            const result = await transporter.sendMail(mailOptions);
            await transporter.sendMail(mailOptions1);
            return res.status(200).json(result);
          } catch (error) {
            return res.status(500).json({
              message : "Ocurrio un error con el servicio de manesajeria"
            })
          }
          }

   
     
}

module.exports = {
    sendEmail
}
  
  