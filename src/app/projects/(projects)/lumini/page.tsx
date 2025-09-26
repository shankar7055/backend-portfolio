import ImageComponent from "@/components/ImageComponent";
import VideoComponent from "@/components/video-component";
import Image from "next/image";

export default function Home() {
  return (
    <article>
      <h1>Lumini</h1>
      <time> December 03, 2018 </time>

      <p>Lumini is an app that helps you learn about your values, skills, and interests while getting in touch with some professions to make a responsible career choice.</p>
      <p> I was responsible for the interaction design, research, and strategy for Lumini, working with two other visual designers to create our app.</p>

      <ImageComponent width={390} height={844} className="bg-white " src="/projects/lumini/home.png" alt="Lumini mobile app home screen with pink gradient and logo" />

      <h2> Empowering Students </h2>
      <p> We have all been there. High school is coming to an end, and we still don't have an answer to the famous question: "What do you want to be when you grow up?". We freeze because, no matter how exciting our options sound, we start to feel claustrophobic as we get closer to making our final decision. </p>
      <p> To understand the scale of this problem, we started looking for quantitative research. We found out that only 41% of students graduate from college in four years. In addition, 30% of students drop out of college after their first year, and 11.6% of students who drop out will transfer and get their degrees elsewhere. </p>
      <p> We aimed to redesign a new career model choice where students can improve their self-knowledge and get in touch with professions, to make a responsible and confident decision. </p>

      <ImageComponent width={2000} height={1433} src="/projects/lumini/Overview_lumini-p-2000.png" alt="Lumini app overview showing career guidance features and interface" />

      <h2> Gathering Information </h2>
      <p> At the start of the project, we didn't have a defined scope or specific goals for the career choice experience. To ensure we had viable user value and impact, we conducted a series of user research sessions. </p>

      <ImageComponent width={2000} height={1333} src="/projects/lumini/group-photo.png" alt="Group photo of students participating in Lumini user research sessions" />

      <h2> What does “Career” mean to you? </h2>
      <p> We interviewed five high school and ten undergrad students in São Paulo. We aimed to gather insights into how they feel, perceive, and think about career choices. </p>
      <p> It was a great opportunity because we could get the perspectives from both sides and grasp the frustrations they face. Some of the early insights are shared below. </p>
      <div className="flex flex-col gap-8 mb-4">
        <div className="flex flex-row gap-8">
          <Image className="size-20 sm:w-40 sm:h-40 border-none" src="/projects/lumini/Ilustration-1.svg" alt="Illustration of person with multiple interests struggling to choose career path" width={290} height={272} />
          <div className="content-center">
            <h3>“I like way too many things”</h3>
            <p>Students were frustrated when they enjoyed too many activities but couldn't find a way to narrow down their options from a list of occupations. </p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="size-20 sm:w-40 sm:h-40 border-none" src="/projects/lumini/Ilustration-2.svg" alt="Illustration representing online career quizzes and superficial information" width={290} height={272} />
          <div className="content-center">
            <h3>“I’ve done some career quizzes”</h3>
            <p>Students felt lost when they searched online for solutions and found only superficial information.</p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="size-20 sm:w-40 sm:h-40 border-none" src="/projects/lumini/Ilustration-3.svg" alt="Illustration of student who has never visited a university" width={290} height={272} />
          <div className="content-center">
            <h3> “I’ve never set foot in a college”</h3>
            <p>Often, high school students never had the opportunity to visit a university, making it even harder to envision their future lives.</p>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <Image className="size-20 sm:w-40 sm:h-40 border-none" src="/projects/lumini/Ilustration-4.svg" alt="Illustration of confident student who has made career decision" width={290} height={272} />
          <div className="content-center">
            <h3>“I am sure about my choice”</h3>
            <p>Students that were confident about their decisions had already talked to workers from their desired occupation.</p>
          </div>
        </div>
      </div>
      <p>I was amazed by the issues we found. Most of the student's inputs and challenges reminded me of the same problems I faced when deciding on my career years ago. It became evident that current solutions failed to address the complexity of the problem.</p>
      
      <h2>Introducing Lumini</h2>
      <p>Life is made up of choices. Sometimes a single decision can inspire people to do the best work of their lives. Lumini is here to help you make one of many important decisions in your life.</p>

      <VideoComponent src="../projects/lumini/onboarding2-transcode.mp4" />

      <h3>Defining your profile</h3>
      <p>We identify the student's professional maturity level through activities and questionnaires and categorize them into five different user models to offer a deeply personalized experience.</p>

      <VideoComponent src="../projects/lumini/Gostos-1-transcode.mp4" />

      <h3>Reflecting on your skills</h3>
      <p>We created activities that encourage students to reflect on their personalities and motivates them to understand that their strengths, passions, and interests correlate to some professions.</p>

      <VideoComponent src="../projects/lumini/Experienciando-1-transcode.mp4" />

      <h3> Getting in touch with professions </h3>
      <p>We suggest students select at least three occupations and search for information about these jobs. Later, we connect students to events with professional workers who can share their life experiences about the reality of these jobs, creating accurate expectations.</p>

      <VideoComponent src="../projects/lumini/jornada-transcode.mp4" />

      <h3>Ending the journey</h3>
      <p>Lastly, we help students find their desired occupation no matter how many times they want to iterate on the journey. Then, when satisfied with the results, we ask for feedback to improve our journey and illuminate more students.</p>
    </article>
  );
}
