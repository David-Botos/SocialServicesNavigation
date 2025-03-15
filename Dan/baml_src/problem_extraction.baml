// This BAML file defines classes to extract social needs problems from conversation transcripts
// for community support organizations

// Define the Problem class structure
class Problem {
  social_need_domain "Housing Instability" | "Employment" | "Childcare" | "Financial Resource Strain" | "Food Insecurity" | "Transportation Challenges" | "Education" | "Social Isolation & Supports" | "Utility Needs" | "Socio-Demographic Information"
  name string
  description string @description(#"
    A detailed description of the problem, including relevant context and specifics
  "#)
  priority int @description(#"
    The urgency/importance level of addressing this need with 1 representing the highest level of importance and 5 representing the least level important
  "#)
  confidence float @description(#"
    Confidence score from 0.0 to 1.0 indicating certainty about this problem assessment
  "#)
}

// Define the Problems class which contains a list of problems
class Problems {
  problems Problem[]
}

function ExtractProblems(transcript: string) -> Problems { 
  client CustomHaiku
  prompt #"
    Extract from this call transcript between a social service agent and client who needs community assistance:
    {{ transcript }}

    {{ ctx.output_format}}
  "#
}

test alex_call {
  functions [ExtractProblems]
  args {
    transcript #"
      Hello, my name is Jim Bot, and I'm a social services assistant.
 I'm here to help you connect with the resources you need.
 I'll be conducting a brief needs assessment to understand your situation better.
 This will help us find the best services for you.
 Please feel free to share as much or as little information as you're comfortable with.

To start, could you please tell me your name and a little bit about yourself, like your age and where you live?
Hi. My name is Alex. I am 28, and I live in Seattle.
Nice to meet you, Alex.
 Thank you for sharing that with me.
 I'm here to help you find the resources you need.
 Can you tell me a bit more about your current living situation?
 Are you renting an apartment, living with family or friends, or is there something else going on?
So currently, I have,
an apartment
with
Mary's Place.
But
I'm
three months behind on rent. And if I don't
yep,
It
up to date within the next sixty days, I'm gonna get affected.
It sounds like you're facing a bit of a challenge with your rent, Alex.
 Mary's Place is a great organization, by the way.
 They do wonderful work in providing temporary housing.
 I'm glad you're connected with them.

Just to clarify, you're saying that you're three months behind on rent, and if you don't get caught up within the next 60 days, you might be at risk of losing your housing.
 Is that correct?

Also, are you currently working or receiving any income that might help you get back on track with your rent?
Yeah.
So, to confirm, you're currently living at Mary's Place, but you're three months behind on rent, and you need to get caught up within the next 60 days to avoid any issues with your housing situation.
 Is that correct?

Also, can you tell me a bit about your health and personal care needs?
 Do you have any medical conditions or disabilities that require special attention or assistance?
That's
that's right.
I want to make sure I understand your situation accurately.
 Now, let's talk about your health and personal care needs, Alex.
 Do you have any medical conditions or disabilities that require ongoing care or support?
 And are you currently receiving any medical treatment or services?
I want to make sure I understand your situation accurately.
 Now, let's talk about your health and personal care needs.
 Do you have any medical conditions or disabilities that require ongoing care or support?
 And are you currently receiving any medical treatment or services?
No.
So, it sounds like you don't have any ongoing medical conditions or disabilities that require special care.
 That's good to know.

Now, I'd like to ask about your daily needs.
 Are you struggling to access basic necessities like food, clothing, or hygiene items?
 Or are you able to meet those needs on your own?
Yeah. I I I I have kids and
like,
like diapers and clothes for them definitely is, like, a
a
that I could use a little bit more help with.
It can be tough to provide for your kids' needs, especially when it comes to essentials like diapers and clothes.
 I'm glad you shared that with me, Alex.
 We can definitely look into resources that might be able to help with those expenses.

So, just to confirm, you have kids, and you're struggling to afford diapers and clothes for them.
 Is that one of your top priorities right now?
So
I
I
I guess.
It sounds like you're not sure if that's your top priority, but it's definitely something that's been a challenge for you.
 Let me ask you this, Alex: what's the one thing that's been keeping you up at night, or worrying you the most?
 Is it the rent situation, the kids' needs, or something else entirely?
I need to figure out, like, how to make money so I can pay the rent.
It sounds like finding a way to earn a steady income is a top priority for you right now, so you can pay your rent and take care of your kids.
 That makes sense.
 We can definitely look into resources that might be able to help with job training, employment opportunities, or other forms of financial assistance.

Before we move forward, I just want to confirm a few things.
 You're currently receiving housing support from Mary's Place, but you're struggling to pay rent.
 You also have kids and are in need of assistance with diapers and clothes.
 And your top priority is finding a way to earn a steady income to pay your rent and take care of your kids.
 Is that all correct?
Yes.
I'm going to summarize the information we've discussed so far, and then I'll let you know what the next steps are.

To confirm, your name is Alex, you're 28 years old, and you live in Seattle.
 You're currently residing at Mary's Place, but you're three months behind on rent and need to get caught up within the next 60 days.
 You have kids and are struggling to afford diapers and clothes for them.
 Your top priority is finding a way to earn a steady income to pay your rent and take care of your kids.

Next steps: I'm going to connect you with some resources that might be able to help with job training, employment opportunities, and financial assistance.
 I'll also look into programs that can provide support with diapers and clothes for your kids.
 We'll work together to create a plan to help you get back on your feet.

Before we go, is there anything else you'd like to share or any other concerns you have that we haven't discussed yet?
No.
I think we've covered everything for now.
 I'm going to go ahead and process the information we've discussed, and I'll be in touch with you soon to follow up on the resources and support we've talked about.
 If you have any questions or concerns in the meantime, please don't hesitate to reach out.
 You can also ask to speak with a human social services representative if you'd like.
 I'm a computer program designed to help with the initial assessment, but I'm happy to connect you with a person if you prefer.
 Is there anything else I can do for you before we wrap up?
Yeah.
I think I'm
good. Thank you.
You're welcome, Alex.
 It was a pleasure speaking with you, and I'm glad we could have this conversation.
 I'll make sure to follow up with you soon to check in on your progress and see how we can continue to support you.
 Take care of yourself and your kids, and don't hesitate to reach out if you need anything.
 Have a great day!
    "#
  }
}