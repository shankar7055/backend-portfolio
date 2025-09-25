import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageComponent from "@/components/ImageComponent";
import VideoComponent from "@/components/video-component"

export default function Home() {
  return (
    <article>
      <h1> Link.me </h1>
      <time> December 03, 2020 </time>

      <ImageComponent priority width={2000} height={1433} src="/projects/stone-link/images/stone-link.png" alt="" className="bg-white" />

      <h2> About </h2>
      <p>Link.me is a payment link app created to help businesses sell online without a website. <br />
        With over 100 million payments across 10,000 companies, its core audience is made up of brick-and-mortar business owners. </p>
      <p> I was a Senior Product Designer in Link.me, where I led the product strategy and design for the mobile team. Later the product got incorporated by Stone.</p>

      <h2> Context </h2>
      <p> In 2019, Brazil started the lockdown due to Covid-19, and merchants were forced to completely suspend their physical operations.
        What product can we build to help small businesses survive by selling online and shift into digital? </p>

      <h2>Research</h2>
      <p> When I joined the team as their first product designer, they were stuck deciding features to match our competitors in the market. Even though this strategy has its benefits, it was not helping us to increase our activation rate and reduce our churn. </p>
      <p> To distinguish ourselves in an already competitive and mature market, we needed user research to help us translate insights into features that address customer's behaviors and motivations. </p>

      <ImageComponent width={1260} height={784} src="/projects/stone-link/stone-link_research.png" alt="" />

      <h2>Research Insights </h2>
      <p> We interviewed 15 customers to learn about the expectations and ideas for improvement they had about our product. We also asked customers to walk us through how they complete their management tasks and their daily frustrations. </p>
      <div className="flex flex-col gap-8 mb-4">
        <div className="flex flex-row gap-8">
          <Image className="bg-white size-20 sm:w-40 sm:h-40 rounded-full" src="/projects/stone-link/illustrations/5.svg" alt="" width={160} height={160} />
          <div className="content-center">
            <h3> I need different account permissions. </h3>
            <p> The business owner did not feel protected inviting employees to his company account because they would see all its balance, sales, and withdrawal money. </p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="bg-white size-20 sm:w-40 sm:h-40 rounded-full" src="/projects/stone-link/illustrations/4.svg" alt="" width={160} height={160} />
          <div className="content-center">
            <h3> I need a desktop version to manage my business. </h3>
            <p> Customers needed a consolidated view and flow to manage the spreadsheets from custom tools on their computers besides Link.me. </p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="bg-white size-20 sm:w-40 sm:h-40 rounded-full" src="/projects/stone-link/illustrations/3.svg" alt="" width={160} height={160} />
          <div className="content-center">
            <h3> I need to know how much taxes I paid </h3>
            <p> Customers expressed that executing payment conciliation at the end of the month was extremely hard considering Link.me didn't provide expense reports. </p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="p-2 bg-white size-20 sm:w-40 sm:h-40 rounded-full" src="/projects/stone-link/illustrations/1.svg" alt="" width={160} height={160} />
          <div className="content-center">
            <h3> "I need a faster cash flow." </h3>
            <p> Link.me only offered two anticipation models, 30 days and 15 days. Still, it wasn't fast enough to ensure cash flow for some kinds of businesses. </p>
          </div>
        </div>
      </div>
      <p> In Brazil, credit card payments in installments are popular, accounting for 80% of e-commerce payments for businesses with a high transaction value. These are collected month-by-month by the merchant (ranging from two to 12 months). </p>

      {/*}
          <h2> Connecting Physical and Digital Worlds </h2>
          <p> With these insights combined with our product analytics, it was clear that digital and physical businesses were churning for different reasons. </p>
          <p> The brick-and-mortar businesses suffered from the beginning of the experience since we didn't offer an anticipation model that suits their cash flow management. </p>
          <p> Digital businesses suffered after experiencing growth because they couldn't distribute our product to their sales team since we only had admin access. </p>
          

          <ImageComponent width={2000} height={1433} src="/projects/stone-link/Journey_map.svg" alt="" />

          <p> These findings were challenging to address because we needed different teams with diverse priorities. However, the time and energy spent to solve these issues were essential to help businesses survive during the pandemic. </p>
          {*/}
      <h2> Improving Link.me </h2>
      <p> Link.me was initially created for digital companies focused on the mobile app. By 2020, tables have turned as physical businesses started to shift into digital. With the new strategy and insights, we improved Link.me to be more competitive and accessible for fast-growing companies. </p>

      <ImageComponent width={1280} height={900} src="/projects/stone-link/images/home.png" alt="" className="bg-white" />
      <ImageComponent width={1280} height={900} src="/projects/stone-link/images/flow-preview.png" alt="" className="bg-white" />
      <ImageComponent width={1280} height={900} src="/projects/stone-link/images/flow-preview-2.png" alt="" className="bg-white" />
      <ImageComponent width={1280} height={900} src="/projects/stone-link/images/flow-preview-3.png" alt="" className="bg-white" />
      <ImageComponent width={1280} height={900} src="/projects/stone-link/images/link-details.png" alt="" className="bg-white" />

      <h3> New management levels for merchants </h3>
      <p> We created the sales profile to help business owners manage their employees' access to the product by removing sensitive information and focusing on selling features. </p>

      <ImageComponent width={1366} height={900} src="/projects/stone-link/images/permissions-1.png" alt="" className="p-10 bg-white" />
      <ImageComponent width={1366} height={900} src="/projects/stone-link/images/permissions-2.png" alt="" className="p-10 bg-white" />

      <h3> From mobile to desktop </h3>
      <p> We created personalized access for our customers to access Link.me information on the Pagar.me web platform, creating a consolidated view and flow to manage finances. </p>

      <ImageComponent width={1366} height={900} src="/projects/stone-link/images/desktop-2.png" alt="" className="p-10 bg-white" />
      <ImageComponent width={1366} height={900} src="/projects/stone-link/images/desktop-1.png" alt="" className="p-10 bg-white" />
      <ImageComponent width={4098} height={2700} src="/projects/stone-link/images/desktop-4.png" alt="" className="p-10 bg-white" />
      <ImageComponent width={1366} height={900} src="/projects/stone-link/images/desktop-3.png" alt="" className="p-10 bg-white" />

      <h2> Results </h2>

      <div className="grid grid-rows mt-4 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Activation rate </CardDescription>
            <CardTitle>+24%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Revenue </CardDescription>
            <CardTitle>+20%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Churn </CardDescription>
            <CardTitle>-17%</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </article>
  );
}
