import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PDFService {
  async generateTicket(booking) {
    return new Promise((resolve, reject) => {
      try {
        const ticketsDir = path.join(__dirname, '../../tickets');

        if (!fs.existsSync(ticketsDir)) {
          fs.mkdirSync(ticketsDir, { recursive: true });
        }

        const filename = `ticket_${booking.pnr}.pdf`;
        const filepath = path.join(ticketsDir, filename);

        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const stream = fs.createWriteStream(filepath);

        doc.pipe(stream);

        doc
          .rect(0, 0, 612, 100)
          .fillAndStroke('#3b82f6', '#2563eb');

        doc
          .fontSize(28)
          .fillColor('#ffffff')
          .text('FLIGHT TICKET', 50, 35, { align: 'center' });

        doc.moveDown(3);

        doc
          .fontSize(12)
          .fillColor('#000000')
          .text('Booking Reference (PNR):', 50, 130);

        doc
          .fontSize(20)
          .fillColor('#3b82f6')
          .text(booking.pnr, 250, 125);

        doc.moveDown(2);

        doc
          .fontSize(16)
          .fillColor('#1f2937')
          .text('Passenger Information', 50, doc.y)
          .moveDown(0.5);

        doc
          .fontSize(11)
          .fillColor('#374151')
          .text(`Name: ${booking.passengerName}`, 50, doc.y)
          .text(`Email: ${booking.user.email}`, 50, doc.y + 5)
          .moveDown(1.5);

        doc
          .fontSize(16)
          .fillColor('#1f2937')
          .text('Flight Information', 50, doc.y)
          .moveDown(0.5);

        const flightY = doc.y;

        doc
          .fontSize(11)
          .fillColor('#374151')
          .text(`Flight Number: ${booking.flight.flightId}`, 50, flightY)
          .text(`Airline: ${booking.flight.airline}`, 50, flightY + 20)
          .text(`From: ${booking.flight.departureCity}`, 50, flightY + 40)
          .text(`To: ${booking.flight.arrivalCity}`, 50, flightY + 60)
          .text(
            `Departure: ${new Date(booking.flight.departureTime).toLocaleString('en-IN')}`,
            50,
            flightY + 80
          )
          .text(
            `Arrival: ${new Date(booking.flight.arrivalTime).toLocaleString('en-IN')}`,
            50,
            flightY + 100
          )
          .moveDown(2);

        doc
          .fontSize(16)
          .fillColor('#1f2937')
          .text('Payment Information', 50, doc.y)
          .moveDown(0.5);

        doc
          .fontSize(11)
          .fillColor('#374151')
          .text(`Amount Paid: ₹${parseFloat(booking.finalPrice).toFixed(2)}`, 50, doc.y)
          .text('Payment Method: Wallet', 50, doc.y + 5)
          .text(
            `Booking Date: ${new Date(booking.bookingDate).toLocaleString('en-IN')}`,
            50,
            doc.y + 5
          )
          .moveDown(3);

        doc
          .fontSize(10)
          .fillColor('#6b7280')
          .text('SCAN CODE', 50, doc.y, { align: 'center' })
          .moveDown(0.5);

        doc
          .fontSize(40)
          .font('Courier')
          .text('||||  ||  |||||  ||  |||', 50, doc.y, { align: 'center' })
          .moveDown(2);

        doc
          .fontSize(9)
          .fillColor('#9ca3af')
          .text(
            'This is an electronic ticket. Please carry a valid government-issued ID proof.',
            50,
            doc.y,
            { align: 'center', width: 500 }
          )
          .moveDown(0.5)
          .text(
            'For support, contact: support@flightbooking.com | +91-1800-000-0000',
            { align: 'center' }
          );

        doc
          .moveTo(50, doc.page.height - 50)
          .lineTo(doc.page.width - 50, doc.page.height - 50)
          .stroke('#e5e7eb');

        doc.end();

        stream.on('finish', () => {
          resolve(`/tickets/${filename}`);
        });

        stream.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new PDFService();
