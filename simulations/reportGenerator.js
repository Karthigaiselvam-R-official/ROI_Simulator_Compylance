const PDFDocument = require('pdfkit');

const generatePDF = (scenarioData, email) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Add content to PDF
      doc.fontSize(20).text('Invoicing Automation ROI Report', { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12).text(`Generated for: ${email}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.fontSize(16).text('Input Parameters');
      doc.fontSize(10);
      doc.text(`Scenario Name: ${scenarioData.input.scenario_name}`);
      doc.text(`Monthly Invoice Volume: ${scenarioData.input.monthly_invoice_volume}`);
      doc.text(`AP Staff: ${scenarioData.input.num_ap_staff}`);
      doc.text(`Hourly Wage: $${scenarioData.input.hourly_wage}`);
      doc.text(`Hours per Invoice: ${scenarioData.input.avg_hours_per_invoice}`);
      doc.text(`Manual Error Rate: ${(scenarioData.input.error_rate_manual * 100).toFixed(1)}%`);
      doc.text(`Error Cost: $${scenarioData.input.error_cost}`);
      doc.moveDown();

      doc.fontSize(16).text('ROI Results');
      doc.fontSize(10);
      doc.text(`Monthly Savings: $${scenarioData.result.monthly_savings.toLocaleString()}`);
      doc.text(`Annual Savings: $${(scenarioData.result.monthly_savings * 12).toLocaleString()}`);
      doc.text(`Payback Period: ${scenarioData.result.payback_months} months`);
      doc.text(`ROI (${scenarioData.input.time_horizon_months} months): ${scenarioData.result.roi_percentage}%`);
      doc.text(`Cumulative Savings: $${scenarioData.result.cumulative_savings.toLocaleString()}`);
      doc.moveDown();

      doc.fontSize(14).text('Conclusion', { underline: true });
      doc.fontSize(10);
      doc.text('Automating your invoicing process demonstrates significant cost savings ');
      doc.text('and rapid return on investment. The projected results show substantial ');
      doc.text('reduction in manual labor costs and error-related expenses.');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generatePDF
};