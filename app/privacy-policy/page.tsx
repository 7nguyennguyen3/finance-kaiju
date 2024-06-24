import { Container } from "@radix-ui/themes";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <Container className="py-3 px-5 mb-20">
      <div className="max-w-4xl mx-auto my-8 p-8 shadow-lg rounded-lg">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-2">Last updated: June 24th, 2024</p>
        <p className="mb-4">
          At Finance Kaiju, one of our main priorities is the privacy of our
          visitors. This Privacy Policy document contains types of information
          that is collected and recorded by Finance Kaiju and how we use it.
        </p>
        <h2 className="text-xl font-semibold mb-3">Information we collect</h2>
        <p className="mb-3">
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>
        <p className="mb-3">
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <p className="mb-4">
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>
        <h2 className="text-xl font-semibold mb-3">
          How we use your information
        </h2>
        <p className="mb-4">
          We use the information we collect in various ways, including to:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Provide, operate, and maintain our website/app</li>
          <li>Improve, personalize, and expand our website/app</li>
          <li>Understand and analyze how you use our website/app</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website/app, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>
        <h2 className="text-xl font-semibold mb-3">Log Files</h2>
        <p className="mb-4">
          {`Finance Kaiju follows a standard procedure of using log files. These
        files log visitors when they visit websites/apps. All hosting companies
        do this and a part of hosting services' analytics. The information
        collected by log files include internet protocol (IP) addresses, browser
        type, Internet Service Provider (ISP), date and time stamp,
        referring/exit pages, and possibly the number of clicks. These are not
        linked to any information that is personally identifiable. The purpose
        of the information is for analyzing trends, administering the site,
        tracking users' movement on the website, and gathering demographic
        information.`}
        </p>
        <h2 className="text-xl font-semibold mb-3">
          Privacy Policies of Other Websites
        </h2>
        <p className="mb-4">
          The Finance Kaiju website/app may contain links to other websites. Our
          privacy policy applies only to our website/app, so if you click on a
          link to another website, you should read their privacy policy.
        </p>
        <h2 className="text-xl font-semibold mb-3">
          Changes to Our Privacy Policy
        </h2>
        <p className="mb-4">
          Finance Kaiju reserves the right to make changes to this privacy
          policy at any time. If there’s a significant change to our privacy
          policy, we will notify you either through the email address you have
          provided us or by placing a prominent notice on our website.
        </p>
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, you can contact
          us at: [Your Contact Information].
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
