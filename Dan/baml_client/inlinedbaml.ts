/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
/* eslint-disable */
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
const fileMap = {
  
  "clients.baml": "// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview\n\nclient<llm> CustomGPT4o {\n  provider openai\n  options {\n    model \"gpt-4o\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomGPT4oMini {\n  provider openai\n  retry_policy Exponential\n  options {\n    model \"gpt-4o-mini\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomSonnet {\n  provider anthropic\n  options {\n    model \"claude-3-5-sonnet-20241022\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n\nclient<llm> CustomHaiku {\n  provider anthropic\n  retry_policy Constant\n  options {\n    model \"claude-3-haiku-20240307\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/round-robin\nclient<llm> CustomFast {\n  provider round-robin\n  options {\n    // This will alternate between the two clients\n    strategy [CustomGPT4oMini, CustomHaiku]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/fallback\nclient<llm> OpenaiFallback {\n  provider fallback\n  options {\n    // This will try the clients in order until one succeeds\n    strategy [CustomGPT4oMini, CustomGPT4oMini]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/retry\nretry_policy Constant {\n  max_retries 3\n  // Strategy is optional\n  strategy {\n    type constant_delay\n    delay_ms 200\n  }\n}\n\nretry_policy Exponential {\n  max_retries 2\n  // Strategy is optional\n  strategy {\n    type exponential_backoff\n    delay_ms 300\n    multiplier 1.5\n    max_delay_ms 10000\n  }\n}",
  "generators.baml": "// This helps use auto generate libraries you can use in the language of\n// your choice. You can have multiple generators if you use multiple languages.\n// Just ensure that the output_dir is different for each generator.\ngenerator target {\n    // Valid values: \"python/pydantic\", \"typescript\", \"ruby/sorbet\", \"rest/openapi\"\n    output_type \"typescript\"\n\n    // Where the generated code will be saved (relative to baml_src/)\n    output_dir \"../\"\n\n    // The version of the BAML package you have installed (e.g. same version as your baml-py or @boundaryml/baml).\n    // The BAML VSCode extension version should also match this version.\n    version \"0.78.0\"\n\n    // Valid values: \"sync\", \"async\"\n    // This controls what `b.FunctionName()` will be (sync or async).\n    default_client_mode async\n}\n",
  "hsds_contact.baml": "// This BAML file defines a function to extract contact information from conversation transcripts\n// for community organization staff/representatives\n\n// Define the Contact class structure\nclass Contact {\n  name string @description(\"The contact's name, which may include first name only or both first and last names\")\n  title string @description(\"The contact's job title\")\n  department string @description(\"The contact's department\")\n  email string @description(\"The contact's email address\")\n  phone string @description(\"The contact's phone number in international format (e.g., '+12344567890'). Assume +1 for US when no country code is specified\")\n  phoneDescription string @description(\"A description of what to expect when calling this number (e.g., 'front desk', 'direct line', 'after-hours emergency line')\")\n  phoneExtension int @description(\"The contact's phone extension in integer format\")\n}\n\n// Define the ContactInformation class which contains a list of contacts\nclass ContactInformation {\n  contacts Contact[] @description(\"List of contact entries extracted from the transcript\")\n}\n\n// Define the LLM function to extract contact information\nfunction ExtractContactInformation(transcript: string) -> ContactInformation {\n  // Specify which LLM client to use (you can define this in clients.baml)\n  client CustomHaiku\n\n  prompt #\"\n    {{ _.role(\"user\") }}\n\n    Extract contact information for community organization staff/representatives (not call center agents) from the following transcript. Follow these rules:\n\n    Contact Information Rules:\n    1. Data Requirements:\n       - Include a contact entry if ANY of these are mentioned: name, email, or phone number\n       - Phone numbers must be formatted with country code (default to +1 for US)\n       - Extensions must be in integer format\n       - Capture contextual information about phone numbers in the phoneDescription field, such as:\n          * Whether it's a front desk, direct line, or general contact\n          * Any specific guidance about when to use the number\n          * Whether it's a personal or shared line\n    \n    2. Scope:\n       - Only extract contact information for staff/representatives of the community organizations\n       - Do NOT create entries for call center agents or other 211 staff\n    \n    Conversation Transcript:\n    {{ transcript }}\n    \n    IMPORTANT: Respond ONLY with the structured data output. Do not include any additional text, explanations, or notes.\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n// Test example\ntest ContactInformationTest {\n  functions [ExtractContactInformation]\n  args {\n    transcript #\"\n      Agent: Thank you for calling 211. My name is Alex. How can I help you today?\n      \n      Caller: Hi, I'm looking for housing assistance resources in Portland.\n      \n      Agent: I'd be happy to help. Let me connect you with Portland Housing Bureau. Their main line is 503-823-4000, and you can ask for Maria Johnson. She's the Outreach Coordinator in the Housing Support Department. Her direct line is 503-823-4567, extension 123. You can also email her at maria.johnson@portlandhousing.org.\n    \"#\n  }\n}\n\ntest DavidConversationTest {\n  functions [ExtractContactInformation]\n  args {\n    transcript #\"\n      [BOT] Hello, I'm Jordan, the AI assistant for Two One One, a resource directory non-profit.\n[BOT]  I'm reaching out to find the right contact at XYZ Community Services to answer some questions about your services.\n[BOT]  Could you please let me know if there's someone who organizes services that our human experts could speak with?\n[USER] Sure.\n[USER] Would be David Bottos, spelled b o t o s His\n[USER] phone number is six three zero four two seven seven one nine nine.\n[USER] Email is david.m.bodice@gmail.com.\n[BOT] Thank you so much for providing that information.\n[BOT]  Just to confirm, the best contact for our human experts to reach out to would be David Bottos, and his contact information is six three zero four two seven seven one nine nine, and his email is david dot m dot botos at gmail dot com.\n[BOT]  Could you please spell his last name again for me, I want to make sure I get it right.\n[USER] B as in boy, o as in Oscar, t as in Tom, o as in Oscar, s as in Sam.\n[BOT] Thank you for spelling that out for me, David.\n[BOT]  So, to confirm, the correct spelling of his last name is indeed B-O-T-O-S. I appreciate you clarifying that for me.\n[BOT]  Now, just to confirm his contact information one more time: David Bottos can be reached at six three zero four two seven seven one nine nine, and his email is david dot m dot botos at gmail dot com.\n[BOT]  Are there any specific times or days when it's best for our human experts to reach out to him?\n[USER] Yeah. Between 9AM and 2PM would be best.\n[USER] On Fridays.\n[BOT] So, to recap, the best contact for our human experts to reach out to is David Bottos, and his contact information is six three zero four two seven seven one nine nine, and his email is david dot m dot botos at gmail dot com.\n[BOT]  He's available to talk between 9AM and 2PM on Fridays.\n[BOT]  I really appreciate you taking the time to provide this information.\n[BOT]  Is there anything else I should know about reaching out to David or XYZ Community Services?\n[USER] Yep. This is alright.\n[USER] I've gotta go.\n[BOT] Thank you so much for your time and for providing the information about David Bottos.\n[BOT]  I appreciate your help, and I'll make sure to pass this along to our human experts.\n[BOT]  Have a great day, and goodbye!\n    \"#\n  }\n}",
  "resume.baml": "// Defining a data model.\nclass Resume {\n  name string\n  email string\n  experience string[]\n  skills string[]\n}\n\n// Create a function to extract the resume from a string.\nfunction ExtractResume(resume: string) -> Resume {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"openai/gpt-4o\" // Set OPENAI_API_KEY to use this client.\n  prompt #\"\n    Extract from this content:\n    {{ resume }}\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n// Test the function with a sample resume. Open the VSCode playground to run this.\ntest vaibhav_resume {\n  functions [ExtractResume]\n  args {\n    resume #\"\n      Vaibhav Gupta\n      vbv@boundaryml.com\n\n      Experience:\n      - Founder at BoundaryML\n      - CV Engineer at Google\n      - CV Engineer at Microsoft\n\n      Skills:\n      - Rust\n      - C++\n    \"#\n  }\n}\n",
}
export const getBamlFiles = () => {
    return fileMap;
}