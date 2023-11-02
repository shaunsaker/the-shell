import { AnchorText, Background, HeadingText, ParagraphText, TitleText } from 'components'
import { app } from 'config'
import React from 'react'

import { Container } from '@/components/container/Container'
import { Section } from '@/components/section/Section'

export default async function Page() {
  return (
    <Section className="min-h-screen mt-[63px] relative">
      <Background variant="inverted" className="absolute inset-0" />

      <Container className="relative">
        <TitleText>Privacy</TitleText>

        <ParagraphText className="mt-16 text-left flex flex-col gap-y-8">
          <HeadingText>1. Introduction</HeadingText>

          <span>
            This Privacy Policy applies to the websites,{' '}
            <AnchorText href={process.env.NEXT_PUBLIC_URL} target="_blank" rel="noopener noreferer">
              {process.env.NEXT_PUBLIC_URL}
            </AnchorText>{' '}
            and{' '}
            <AnchorText href={process.env.NEXT_PUBLIC_APP_URL} target="_blank" rel="noopener noreferer">
              {process.env.NEXT_PUBLIC_APP_URL}
            </AnchorText>
            , (hereinafter the “website”) published by the company <b>{app.name}</b> (hereinafter “the company” or “we”)
            and its other services and products where personal data is shared with the company. Please read this Privacy
            Policy carefully as it explains how the company uses your personal data and how to exercise your rights.
            This Privacy Policy supplements the Terms & Conditions or any documents or notices that may refer to this
            Privacy Policy. Should you have any questions, you may directly contact the company by sending an email to{' '}
            <AnchorText href={`mailto:${app.emails.support}`} target="_blank" rel="noopener noreferer">
              {app.emails.support}
            </AnchorText>
            .
          </span>

          <HeadingText>2. Definitions</HeadingText>

          <span>
            DATA means data about a living individual who can be identified from those data (or from those and other
            information either in our possession or likely to come into our possession).
            <br />
            <br />
            USAGE DATA is data collected automatically either generated by the use of Service or from Service
            infrastructure itself (for example, the duration of a page visit).
            <br />
            <br />
            COOKIES are small files stored on your device (computer or mobile device).
            <br />
            <br />
            DATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other
            persons) determines the purposes for which and the manner in which any personal data are, or are to be,
            processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.
            <br />
            <br />
            DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of
            the Data Controller. We may use the services of various Service Providers in order to process your data more
            effectively.
            <br />
            <br />
            DATA SUBJECT is any living individual who is the subject of Personal Data.
            <br />
            <br />
            THE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject
            of Personal Data.
          </span>

          <HeadingText>3. Legal context</HeadingText>

          <span>
            We adhere to the guidelines provided by the relevant authorities and have established an organization to
            ensure our compliance with the regulatory framework outlined in the General Data Protection Regulation (EU)
            2016/679 of the European Parliament and of the Council (GDPR) and any other applicable laws or regulations
            related to personal information.
          </span>

          <HeadingText>4. What is our role?</HeadingText>

          <span>
            Under the GDPR, we are classified as a data controller. This designation means that we determine the reasons
            and methods for processing your personal information. For instance, when you visit our website, we are
            responsible for specifying the purposes and the necessary methods to manage the personal information of our
            users that we collect from it.
            <br />
            <br />
            Depending on the specific activity involving your data, we may also act as a data processor. In this
            scenario, you, as an end user of our customer, are the data subject, and we process your data according to
            our customer's instructions, who is regarded as the data controller. The data controller establishes the
            objectives and methods for the processing activity, and we comply with and deliver our services in alignment
            with these instructions.
          </span>

          <HeadingText>5. What kind of personal information do we process?</HeadingText>

          <span>
            We collect and process only relevant and adequate personal information, paying special attention to its
            accuracy and timely updates. Personal information encompasses various types of data, including:
            <br />
            <br />
            - Connection data: Examples include IP addresses, logs, terminal and connection identifiers, timestamps,
            etc.
            <br />
            <br />
            - Internet data: This category comprises cookies, tracers, navigation data, audience metrics, etc.
            <br />
            <br />
            - Identification data: Such as first name, last name, picture, birth date, etc.
            <br />
            <br />
            The collection of this information may be mandatory to provide our service, or it could be optional, aimed
            at enhancing your experience and left to your discretion. When we collect your data, we clearly indicate
            whether it is mandatory or optional.
            <br />
            <br />
            Please note that if you refuse to provide mandatory information, we may not be able to offer you our full
            range of services, and you might experience inconveniences. Your understanding and cooperation are
            appreciated.
          </span>

          <HeadingText>6. When do we collect your personal information?</HeadingText>

          <span>
            We gather your personal information on different occasions through various sources:
            <br />
            <br />
            - Website or Software Visit: When an individual browses our website or uses our software solutions, certain
            data is collected to enhance user experience and provide relevant services.
            <br />
            <br />
            - Billing Form: When an individual completes a payment checkout, we collect necessary information to process
            the transaction securely and efficiently.
            <br />
            <br />
            Rest assured, we handle this information with utmost care and in compliance with applicable data protection
            laws.
          </span>

          <HeadingText>7. How do we use your personal information?</HeadingText>

          <span>
            We want to assure you that your personal information will never be used for purposes that are incompatible
            with the reasons it was initially collected. We adhere to strict guidelines, collecting and processing
            personal information only for specified, explicit, and legitimate purposes, such as:
            <br />
            <br />
            - Website Audience Measurement: Gathering analytics on website traffic to enhance user experience and
            content relevance.
            <br />
            <br />
            - Payment & Billing Management: Processing financial transactions to fulfill contractual obligations.
            <br />
            <br />
            To ensure compliance with the principle of lawfulness, we carefully determine the legal basis for each data
            processing activity, as outlined in Article 6 of the GDPR. Importantly, we do not process your data or use
            automated decision-making processes without your knowledge, and we never sell or rent your personal
            information without your explicit consent. Your privacy and trust are paramount to us.
          </span>

          <HeadingText>8. Who can access your personal information?</HeadingText>

          <span>
            We want you to know that we choose recipients for your personal information carefully. They receive this
            data for legitimate purposes, essential for our business operations and to provide you with high-quality
            service. Here's how we categorize them:
            <br />
            <br />
            - Subprocessors: Entities like Stripe, Inc. assist us in payment processing. These entities act as data
            processors under Article 28 of the GDPR. We rigorously review their handling of personal information and
            ensure they implement appropriate safeguards for its protection.
            <br />
            <br />
            - Authorized Third Parties: Some recipients are considered authorized third parties under Article 4 of the
            GDPR. We share your personal information with them when necessary to meet legal obligations, respond to
            lawful requests, and comply with legal processes (such as subpoenas or requests from government or tax
            authorities).
            <br />
            <br />
            Rest assured, your privacy and the security of your data remain our top priority.
          </span>

          <HeadingText>9. Where do we transfer your personal information?</HeadingText>

          <span>
            We strive to process your personal information within the European Union whenever possible. However, some of
            our service providers may operate in countries where you are a resident or outside the European Union.
            <br />
            <br />
            When we transfer your personal information to a recipient located outside the European Union, we ensure your
            data's safety by implementing sufficient guarantees as outlined in Articles 44 to 50 of the GDPR. This may
            include storing it in a country with adequate privacy protection or establishing Data Protection Agreements
            to safeguard your information.
            <br />
            <br />
            Here are the details of our subprocessors and the adopted safeguards:
            <br />
            <br />
            - Subprocessor: [Name of the subprocessor]
            <br />
            <br />
            - Location: [Location outside the European Union]
            <br />
            <br />
            - Adopted Safeguard: [Brief description of the safeguard implemented]
            <br />
            <br />
            Your privacy and the security of your data are of utmost importance to us.
          </span>

          <HeadingText>10. How long do we store your personal information?</HeadingText>

          <span>
            In our role as a data controller under the GDPR, we establish retention periods for your personal
            information based on the purposes for which it was collected and our legal obligations. When we act as a
            data processor for our customers, we retain their end users' personal information for the duration specified
            in our terms and conditions and as necessary to provide the subscribed services. Once these purposes are
            fulfilled or upon your request, your personal information is either archived, erased, or anonymized,
            ensuring your data's security and privacy.
          </span>

          <HeadingText>11. How do we protect your personal information?</HeadingText>

          <span>
            We prioritize the safety of your personal information and have implemented rigorous technical and
            organizational security measures to maintain its confidentiality, integrity, and availability. Our efforts
            are aimed at minimizing risks to your rights and freedoms. To achieve this, we carefully adhere to the
            recommendations provided by competent authorities regarding security. Your trust and the security of your
            data are of utmost importance to us.
          </span>

          <HeadingText>12. What are your rights and how to exercise them?</HeadingText>

          <span>
            In accordance with Articles 12 to 23 of the GDPR, we respect your rights over your personal information, and
            you can:
            <br />
            <br />
            - Request access to your personal information and obtain a copy of it.
            <br />
            <br />
            - Ask us to modify your personal information if it is obsolete, inaccurate, or incomplete.
            <br />
            <br />
            - Object to the processing of your personal information based on our legitimate interest in certain
            circumstances.
            <br />
            <br />
            - Request to restrict the processing for a limited period in certain circumstances.
            <br />
            <br />
            - Opt-out from consent already given; this withdrawal does not affect the lawfulness of prior processing
            operations.
            <br />
            <br />
            - Request the personal information you provided, or have it communicated to a third party, where technically
            feasible.
            <br />
            <br />
            - Ask us to delete your personal information if it meets applicable legal grounds.
            <br />
            <br />
            These rights can be exercised directly and at any time by sending an email to [your email address] or
            visiting our Data Requests page at [link to the Data Requests page]. If you are our customer's end user,
            please note that such requests will be forwarded to and addressed by them directly.
          </span>

          <HeadingText>13. Children's privacy</HeadingText>

          <span>
            Our Services are not intended for use by children under the age of 13 ('Children'). We do not knowingly
            collect personally identifiable information from Children under 13. If you become aware that a Child has
            provided us with Personal Data, please contact us immediately. If we discover that we have collected
            Personal Data from Children without parental consent verification, we take prompt steps to remove that
            information from our servers. We are committed to ensuring the privacy and safety of all users, especially
            children.
          </span>

          <HeadingText>14. Policy changes</HeadingText>

          <span>
            This Privacy Policy may be modified in the future to ensure its alignment with legal requirements and
            developments. Any changes will be communicated to you through a special mention on this page or via
            personalized notifications, such as email alerts, to keep you informed.
          </span>

          <HeadingText>15. Contact us</HeadingText>

          <span>
            If you have any questions about this Privacy Policy, please contact us via email at{' '}
            <AnchorText href={`mailto:${app.emails.support}`} target="_blank" rel="noopener noreferer">
              {app.emails.support}
            </AnchorText>
            .
          </span>
        </ParagraphText>
      </Container>
    </Section>
  )
}
