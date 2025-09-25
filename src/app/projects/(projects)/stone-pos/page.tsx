import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageComponent from "@/components/ImageComponent";
import VideoComponent from "@/components/video-component";

export default function Home() {
  return (
    <article>
      <h1> Stone Payment Terminal </h1>
      <time> October 10, 2024 </time>

      <ImageComponent width={2000} height={1433} src="/projects/stone-pos/sales-home.png" alt="" className="bg-white" />
      
      <p> In 2024, we set out to build one of the most ambitious products in Stone’s history. A new point-of-sale (POS) product that helps merchants issue invoices, track sales, manage cash flow, and control inventory all in one place. </p>
      <p> It all started with a shift in the market. Brazil had just passed a law requiring SMBs to issue electronic invoices. Most companies responded by building compliance features. But we saw an opportunity to rethink how small businesses run their operations altogether. </p>

      <h2> The Challenge </h2>
      <p> Entrepreneurs usually turn to software when running their business starts to outgrow spreadsheets and gut instinct. They want visibility. They want control. They want tools that make everyday decisions easier. </p>
      <p> But the reality is that most POS systems do not deliver that. They are built decades ago, patched over time, and often too rigid, too expensive, or too complicated for small merchants to use. They solve one piece of the puzzle but force the user to juggle the rest manually. </p>
      <p> We wanted to change that. We believed that if we built sales management features natively into Stone, deeply integrated with payments and banking, we could make those daily decisions seamless and, in doing so, significantly increase customer lifetime value. </p>

    
      <h2> Who We Built It For </h2>
      <p> We decided to start small, literally. Our first version focused on small retailers: up to five employees, one store, and around 300 SKUs. Most of them still manage sales manually, track inventory with pen and paper, and depend on accountants to stay compliant. </p>
      <p> These are the businesses that do not want complexity. They want clarity. They want tools that work out of the box, require no setup, and integrate naturally into the way they already operate.</p>
     
      <h2> Introducing the POS </h2>

      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/onboarding-1.png" alt="" />

      <h3> Onboarding </h3>
      <p> We designed the sales flow to be the backbone of the experience, built for speed, simplicity, and reliability. Since sales staff interact with it dozens or even hundreds of times a day, it needed to feel almost invisible, allowing them to complete transactions with minimal taps, no friction, and total confidence. Every sale is processed accurately, with correct pricing and no need for manual calculations or second-guessing. </p>
      
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/onboarding-2.png" alt="" />

      <h3> Sales Flow </h3>
      <p> We designed the sales flow to be the backbone of the experience, built for speed, simplicity, and reliability. Since sales staff interact with it dozens or even hundreds of times a day, it needed to feel almost invisible, allowing them to complete transactions with minimal taps, no friction, and total confidence. Every sale is processed accurately, with correct pricing and no need for manual calculations or second-guessing. </p>

      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/sell-1.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/sell-2.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/sell-3.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/sell-4.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/sell-5.png" alt="" />

      <h3> Inventory Control </h3>
      <p> We wanted to give merchants real-time control over their stock, not just to avoid stockouts or overstock but to help them plan. With accurate, up-to-date inventory, they can keep shelves full, negotiate better with suppliers, and align purchasing with real demand. The result is healthier cash flow and higher margins. </p>

      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/inventory-2.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/inventory-1.png" alt="" />

      <h3> Sales and Cash Management </h3>
      <p> Finally, we built tools to bring simplicity and confidence to reconciliation. Every transaction is traceable, every order accounted for, and every closing session easier than the last. Instead of fighting their tools, merchants can focus on running and growing their business. </p>

      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/report-2.png" alt="" />
      <ImageComponent className="bg-white" width={1280} height={720} src="/projects/stone-pos/report-1.png" alt="" />

      <h2> Results </h2>
      <p> ----- </p>

      <div className="grid grid-rows mt-4 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Users </CardDescription>
            <CardTitle>+70%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Conversion </CardDescription>
            <CardTitle>+200%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Enrollment </CardDescription>
            <CardTitle>+225%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Enrollment </CardDescription>
            <CardTitle>+225%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Enrollment </CardDescription>
            <CardTitle>+225%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription> Enrollment </CardDescription>
            <CardTitle>+225%</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </article>
  );
}
