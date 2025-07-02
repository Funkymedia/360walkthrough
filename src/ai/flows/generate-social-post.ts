'use server';
/**
 * @fileOverview Generates social media posts for properties.
 *
 * - generateSocialPost - A function that creates social media content for a property.
 * - GenerateSocialPostInput - The input type for the generateSocialPost function.
 * - GenerateSocialPostOutput - The return type for the generateSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialPostInputSchema = z.object({
  name: z.string().describe('The name or title of the property listing.'),
  address: z.string().describe('The address of the property.'),
  description: z.string().describe('A brief description of the property.'),
  contactName: z.string().describe('The name of the contact person or agent.'),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GenerateSocialPostOutputSchema = z.object({
  postContent: z.string().describe('The full text for the social media post, including a description, hashtags, and a call to action.'),
});
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are an expert social media manager for a real estate agency called '360 Walkthrough'. Your task is to generate an engaging social media post to advertise a new property listing.

Use the provided details to craft a compelling description that highlights the key features of the property.

The post should have three parts:
1.  An enticing description of the property.
2.  A relevant set of hashtags (e.g., #newlisting #dreamhome #propertyforsale #[CityName]).
3.  A clear call to action, encouraging potential buyers to contact the agent for more information or to schedule a viewing.

Property Details:
- Title: {{{name}}}
- Address: {{{address}}}
- Description: {{{description}}}
- Agent Name: {{{contactName}}}

Generate the complete post text. Be friendly, professional, and persuasive.`,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
