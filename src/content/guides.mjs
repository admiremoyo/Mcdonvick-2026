// Tax guides at /guides/<slug>/. Facts were checked against the linked sources on the
// `reviewed` date. Re-check them whenever ZIMRA, NSSA or the Registrar announce changes.

export const guides = [
  {
    slug: 'qpd-provisional-tax',
    title: 'QPDs explained: provisional tax payment dates in Zimbabwe',
    short: 'QPDs explained',
    icon: 'fas fa-calendar-days',
    summary: 'What Quarterly Payment Dates are, when they fall, how much to pay each quarter, and how to avoid penalties.',
    reviewed: '2026-09-28',
    services: ['tax-advisory', 'accounting-bookkeeping'],
    sources: [
      { name: 'ZIMRA: Tax payment dates', url: 'https://www.zimra.co.zw/domestic-taxes/tax-payment-dates' },
      { name: 'ZIMRA: How are QPD amounts calculated?', url: 'https://www.zimra.co.zw/frequently-asked-questions/1947-how-do-you-calculate-amounts-paid-on-quarterly-payment-dates-qpd' },
    ],
    body: `
      <h2 id="what">What are QPDs?</h2>
      <p>Quarterly Payment Dates (QPDs) are the four dates each year when businesses pay <strong>provisional income tax</strong> to ZIMRA. Instead of paying all your income tax after the year ends, you estimate the year's tax and pay it in four instalments as you go.</p>
      <p>QPDs apply to companies and other taxpayers who earn income from trade or investments. Employees whose only income is a salary already pay through PAYE and do not pay QPDs.</p>

      <h2 id="dates">QPD dates and percentages</h2>
      <p>Each instalment is a set percentage of your <em>estimated</em> tax for the whole year:</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Instalment</th><th>Due date</th><th>% of estimated annual tax</th><th>Cumulative</th></tr></thead>
        <tbody>
          <tr><td>1st QPD</td><td>25 March</td><td>10%</td><td>10%</td></tr>
          <tr><td>2nd QPD</td><td>25 June</td><td>25%</td><td>35%</td></tr>
          <tr><td>3rd QPD</td><td>25 September</td><td>30%</td><td>65%</td></tr>
          <tr><td>4th QPD</td><td>20 December</td><td>35%</td><td>100%</td></tr>
        </tbody>
      </table></div>
      <p>ZIMRA's recent public notices also set a date for submitting the QPD return a few days before each payment date (for example, 20 March for the first QPD of 2026), so plan to have your figures ready early.</p>

      <h2 id="calculate">How to calculate your QPDs</h2>
      <ol>
        <li><strong>Estimate your taxable income for the year</strong> from your management accounts, budget and last year's results.</li>
        <li><strong>Work out the estimated income tax</strong> on that income.</li>
        <li><strong>Apply the percentage</strong> for each quarter, less anything you have already paid.</li>
      </ol>
      <div class="callout">
        <p class="callout-title">Worked example</p>
        <p>A company estimates its income tax for the year at <strong>US$20,000</strong>. Its QPDs would be:</p>
        <ul>
          <li>25 March: 10% = <strong>US$2,000</strong></li>
          <li>25 June: 25% = <strong>US$5,000</strong></li>
          <li>25 September: 30% = <strong>US$6,000</strong></li>
          <li>20 December: 35% = <strong>US$7,000</strong></li>
        </ul>
        <p>If trading changes during the year, the estimate should be revised and later instalments adjusted so the cumulative total stays on track.</p>
      </div>

      <h2 id="mistakes">Common mistakes to avoid</h2>
      <ul>
        <li><strong>Deliberately low estimates.</strong> Underestimating to reduce early payments can lead to penalties and interest once the actual tax is known.</li>
        <li><strong>Forgetting to revise.</strong> A strong second half of the year means earlier estimates are probably too low.</li>
        <li><strong>Paying late.</strong> Late QPDs attract penalties and interest, and outstanding amounts can block your tax clearance.</li>
        <li><strong>Mixing up currencies.</strong> Make sure payments are made in the correct currency for the tax due.</li>
      </ul>

      <h2 id="after">After the year ends</h2>
      <p>Once your financial statements are finalised, your annual income tax return (ITF12C) reconciles the actual tax for the year against the QPDs you paid. Any balance is then settled, or any overpayment is carried forward or refunded.</p>`,
  },
  {
    slug: 'tax-clearance-itf263',
    title: 'Tax clearance (ITF263) in Zimbabwe: how to get it under TaRMS',
    short: 'Getting tax clearance',
    icon: 'fas fa-certificate',
    summary: 'What an ITF263 is, why tenders and customers ask for it, and what to fix if ZIMRA\'s system won\'t issue yours.',
    reviewed: '2026-09-28',
    services: ['tax-advisory', 'business-consultancy'],
    sources: [
      { name: 'ZIMRA: Use new TaRMS platform to access tax clearances', url: 'https://www.zimra.co.zw/news/22-taxmans-corner/2273-use-new-tarms-platform-to-access-tax-clearances' },
      { name: 'ZIMRA FAQ: How do I get a tax clearance certificate?', url: 'https://www.zimra.co.zw/frequently-asked-questions/1937-how-do-i-get-a-tax-clearance-certificate' },
    ],
    body: `
      <h2 id="what">What is an ITF263?</h2>
      <p>An ITF263 is a <strong>tax clearance certificate</strong> issued by ZIMRA. It confirms that a taxpayer's affairs are in order: returns filed and taxes paid.</p>

      <h2 id="why">Why you need one</h2>
      <ul>
        <li><strong>Tenders:</strong> government and many private tenders require a valid tax clearance.</li>
        <li><strong>Getting paid in full:</strong> customers may be required to withhold tax from payments to suppliers who cannot show a valid tax clearance.</li>
        <li><strong>Credibility:</strong> banks, partners and large customers often ask for it as proof you are compliant.</li>
      </ul>

      <h2 id="tarms">How it works under TaRMS</h2>
      <p>Since ZIMRA moved to its <strong>Tax and Revenue Management System (TaRMS)</strong>, tax clearance is handled online. According to ZIMRA, to access a tax clearance you must:</p>
      <ol>
        <li><strong>Claim your Taxpayer Identification Number (TIN)</strong> and register on the TaRMS self-service portal.</li>
        <li><strong>Be up to date with all returns</strong> for every tax type you are registered for.</li>
        <li><strong>Be up to date with all payments</strong>: VAT, income tax, PAYE, withholding taxes and any others that apply.</li>
      </ol>
      <p>Tax clearance certificates are valid for a limited period, so check the expiry date on yours and stay compliant month by month rather than catching up just before a tender closes.</p>

      <h2 id="blocked">Why your tax clearance isn't coming through</h2>
      <p>If you can't get your ITF263, one of these is usually the cause:</p>
      <ul>
        <li>An outstanding return, often a nil return for a tax type you don't actively use</li>
        <li>An unpaid balance, penalty or interest on your account</li>
        <li>Balances brought across from ZIMRA's old system that don't match your records</li>
        <li>Registration details on TaRMS that are incomplete or incorrect</li>
      </ul>
      <div class="callout">
        <p class="callout-title">How McDonvick helps</p>
        <p>We review your TaRMS account, identify exactly what is blocking your clearance, file any missing returns, reconcile balances with ZIMRA and help arrange payment where needed.</p>
      </div>`,
  },
  {
    slug: 'vat-registration-zimbabwe',
    title: 'VAT registration in Zimbabwe: threshold, documents and next steps',
    short: 'VAT registration',
    icon: 'fas fa-percent',
    summary: 'When VAT registration becomes compulsory, what ZIMRA asks for, and what changes once you are registered.',
    reviewed: '2026-09-28',
    services: ['tax-advisory', 'accounting-bookkeeping'],
    sources: [
      { name: 'ZIMRA: VAT registration', url: 'https://www.zimra.co.zw/domestic-taxes/vat/vat-registration' },
      { name: 'ZIMRA: Tax payment dates', url: 'https://www.zimra.co.zw/domestic-taxes/tax-payment-dates' },
    ],
    body: `
      <h2 id="threshold">When must you register?</h2>
      <p>According to ZIMRA, a trader must register for VAT if the value of its taxable supplies <strong>exceeds, or is expected to exceed, US$25,000 (or the ZiG equivalent) in any 12-month period</strong>.</p>
      <p>Registration takes effect from the first day of the month after the threshold is reached, so keep an eye on your rolling 12-month turnover.</p>

      <h2 id="voluntary">Voluntary registration</h2>
      <p>Businesses below the threshold can choose to register. The main benefits are being able to claim input VAT on purchases and being able to supply larger customers who prefer VAT-registered suppliers. The trade-off is more administration: monthly or periodic returns and stricter invoicing rules.</p>

      <h2 id="documents">What ZIMRA asks for</h2>
      <p>ZIMRA lists these requirements for VAT registration:</p>
      <ul class="checklist">
        <li>Registration with ZIMRA and a TIN</li>
        <li>Payments for all tax heads up to date</li>
        <li>A sales schedule from when you started trading to date</li>
        <li>Sample sales invoices showing customer names and phone numbers, or signed contracts</li>
        <li>Sales projections for the next 12 months</li>
        <li>A current, stamped bank statement</li>
        <li>A letter appointing a public officer</li>
        <li>A valid lease agreement in the company's name, or a title deed</li>
      </ul>
      <p>For compulsory registration you will also enter your sales for the past 12 months, in US$, when you apply on TaRMS.</p>

      <h2 id="after">Once you are registered</h2>
      <ul>
        <li><strong>File VAT returns and pay</strong> by the 25th day of the month after each tax period.</li>
        <li><strong>Issue valid tax invoices</strong> and use ZIMRA's fiscalisation requirements for your invoicing.</li>
        <li><strong>Keep proper records</strong> of every sale and purchase, including supplier tax invoices to support input VAT claims.</li>
      </ul>
      <div class="callout">
        <p class="callout-title">Not sure if you've crossed the threshold?</p>
        <p>Send us your sales figures for the last 12 months and we'll tell you where you stand and handle the registration on TaRMS if needed.</p>
      </div>`,
  },
  {
    slug: 'employer-paye-nssa-checklist',
    title: 'Employer\'s monthly checklist: PAYE, NSSA and ZIMDEF',
    short: 'Employer payroll checklist',
    icon: 'fas fa-clipboard-check',
    summary: 'The monthly and annual payroll obligations every Zimbabwean employer needs to meet, and the dates to meet them.',
    reviewed: '2026-09-28',
    services: ['payroll', 'tax-advisory'],
    sources: [
      { name: 'ZIMRA: Tax payment dates', url: 'https://www.zimra.co.zw/domestic-taxes/tax-payment-dates' },
      { name: 'NSSA: Contributions', url: 'https://www.nssa.org.zw/contributions/' },
    ],
    body: `
      <h2 id="new">When you take on staff</h2>
      <ul class="checklist">
        <li>Register as an employer for PAYE with ZIMRA</li>
        <li>Register as an employer with NSSA, and register each new employee</li>
        <li>Collect each employee's ID number, start date, salary and banking details</li>
        <li>Confirm which currency each employee is paid in, so the correct tax tables are used</li>
      </ul>

      <h2 id="monthly">Every month</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Task</th><th>Deadline</th></tr></thead>
        <tbody>
          <tr><td>Run payroll and issue payslips</td><td>Your pay date</td></tr>
          <tr><td>Pay PAYE (including AIDS levy) to ZIMRA</td><td>By the 10th of the following month</td></tr>
          <tr><td>Submit the NSSA P4 return and pay contributions</td><td>Generally by the 10th of the following month</td></tr>
          <tr><td>Pay the ZIMDEF (standards development) levy</td><td>Monthly, after each month end</td></tr>
        </tbody>
      </table></div>

      <h2 id="annual">Every year</h2>
      <ul class="checklist">
        <li>Reconcile the year's payroll against PAYE paid</li>
        <li>Submit the employer's annual PAYE return to ZIMRA</li>
        <li>Issue employee tax certificates for the year</li>
        <li>Review salaries, allowances and benefits for tax treatment</li>
      </ul>

      <h2 id="leavers">When someone leaves</h2>
      <p>Calculate final pay, leave pay and any termination package, apply the correct tax treatment, and update NSSA and your payroll records.</p>

      <div class="callout">
        <p class="callout-title">Penalties add up quickly</p>
        <p>Late PAYE and NSSA payments attract penalties and interest, and PAYE arrears can stop your tax clearance being issued. Outsourcing payroll is often cheaper than the penalties.</p>
      </div>`,
  },
  {
    slug: 'company-registration-pbc-vs-pvt-ltd',
    title: 'Registering a business in Zimbabwe: PBC or Private Limited Company?',
    short: 'PBC vs Pvt Ltd',
    icon: 'fas fa-building-columns',
    summary: 'How the two most popular structures under the COBE Act compare, and the steps to register either one.',
    reviewed: '2026-09-28',
    services: ['company-secretarial', 'tax-advisory'],
    sources: [
      { name: 'ICAZ: The Companies and Other Business Entities Act [Chapter 24:31], key provisions', url: 'https://www.icaz.org.zw/common/Uploaded%20files/iMISDocs/UPDATE_ON_THE_NEW_COBE_2020.pdf' },
    ],
    body: `
      <h2 id="options">Two popular options</h2>
      <p>Under the <strong>Companies and Other Business Entities (COBE) Act [Chapter 24:31]</strong>, most small and growing businesses choose either a <strong>Private Business Corporation (PBC)</strong> or a <strong>Private Limited Company (Pvt Ltd)</strong>. Both give the owners limited liability.</p>

      <h2 id="compare">How they compare</h2>
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>PBC</th><th>Private Limited Company</th></tr></thead>
        <tbody>
          <tr><td>Owners</td><td>1 to 20 members</td><td>Up to 50 shareholders</td></tr>
          <tr><td>Management</td><td>Managed directly by its members</td><td>Directors, with a company secretary</td></tr>
          <tr><td>Ownership</td><td>Each member holds a percentage interest (totalling 100%)</td><td>Shares allotted to shareholders</td></tr>
          <tr><td>Administration</td><td>Simpler</td><td>More formal</td></tr>
          <tr><td>Best for</td><td>Owner-run businesses: consultancies, shops, transport operators</td><td>Businesses planning to raise investment, scale or bid for large tenders</td></tr>
        </tbody>
      </table></div>

      <h2 id="steps">Registration steps</h2>
      <ol>
        <li><strong>Name search.</strong> Submit up to five proposed names in order of preference. The Registrar rejects names that are too similar to existing ones or misleading. An approved name is reserved for up to 30 days.</li>
        <li><strong>Prepare the documents.</strong> For a Private Limited Company this includes the company's constitution, registered address and list of directors. For a PBC, it sets out the members and each one's percentage interest.</li>
        <li><strong>Lodge with the Registrar.</strong> Once approved, the entity receives a registration number and certificate of incorporation.</li>
      </ol>

      <h2 id="after">After incorporation</h2>
      <ul class="checklist">
        <li>Register with ZIMRA and claim your TIN on TaRMS</li>
        <li>Register for VAT if you meet the threshold, and PAYE if you employ staff</li>
        <li>Register with NSSA as an employer if you have employees</li>
        <li>Open a business bank account in the company's name</li>
        <li>Diarise annual returns and keep statutory registers up to date</li>
      </ul>
      <div class="callout">
        <p class="callout-title">Let us handle it</p>
        <p>We take care of the name search, documents, registration and ZIMRA setup, so your new business starts out fully compliant.</p>
      </div>`,
  },
];
