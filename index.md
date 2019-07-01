---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

## Skills & credentials

What skills have you acquired throughout your life? What training, credentials, certifications, or awards have you received?

## Passions & interests

What industries and topics are you most interested in? What are you passionate about?

Talk about what I do at work. Successfully

###### bash

```bash
$ git clone https://github.com/avanderw/avanderw.github.io
$ cd avanderw.github.io
$ echo "Hello World" > index.html
$ git add --all
$ git commit -m "Initial commit"
$ git push -u origin master
```

###### java

```java
package za.co.entelect.challenge;

import com.google.gson.Gson;
import za.co.entelect.challenge.command.Command;
import za.co.entelect.challenge.entities.GameState;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;
import java.util.Scanner;

public class Main {

    private static final String ROUNDS_DIRECTORY = "rounds";
    private static final String STATE_FILE_NAME = "state.json";

    /**
     * Read the current state, feed it to the bot, get the output and print it to stdout
     *
     * @param args the args
     **/
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Gson gson = new Gson();
        Random random = new Random(System.nanoTime());

        while (true) {
            try {
                int roundNumber = sc.nextInt();

                String statePath = String.format("./%s/%d/%s", ROUNDS_DIRECTORY, roundNumber, STATE_FILE_NAME);
                String state = new String(Files.readAllBytes(Paths.get(statePath)));

                GameState gameState = gson.fromJson(state, GameState.class);
                Command command = new Bot(random, gameState).run();

                System.out.println(String.format("C;%d;%s", roundNumber, command.render()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```
## Core values & beliefs

### Values



- Open-mindedness
- Honesty
- Efficiency
- Courage
- Challenge

### Beliefs

What do you believe in? What do you stand for? What do you stand against?

## Your brand vision

What do you want to be known for? If you became known as the world’s go-to expert on XYZ topic, what would that be?

## Your brand mission

Why do you want to build a personal brand? What is your purpose? Who do you want to influence? What do you want to accomplish?

## Your brand message

What is the key message you want to communicate? What message do you want to consistently reinforce in your content and in your marketing? If you could only give one piece of advice to your audience, what would it be?

## Your brand personality

What are some of your personal characteristics and traits that you can weave into your brand? Do you want to be perceived as very polished and professional, or perhaps more quirky and adventurous?

## Target audience

### Demographics

What is their age, gender, education, relationship status, income, profession, etc.?

### Desires and aspirations

What is their desired future? What are their dreams, goals, and aspirations?

### Pain points and challenges

What are they struggling with? What is preventing them from achieving their goals?

## What I do?

Your answer to this question is your **value proposition**. What is the value that you provide to your clients in exchange for charging them?

## How do you do it?

Give your process, product, or service a unique name. When you give it a unique name, it immediately stands out from any competing offers that promise the same result.

## Have a content strategy

Creating and distributing free content is one of the most effective ways to build your brand and earn the trust of your target audience. Instead of trying to convince your audience that you can help them, you create content that *actually* helps them. This builds trust and helps to position you as an expert and an authority in your industry.

> Identify some core themes in which you strongly believe and build a series of content around that and then keep hammering it home. 
> *some author*

### Focus on quality & consistency

For [content marketing](https://www.thinkific.com/resources/content-strategy-convert-customers/) to work, it’s important to focus on quality and consistency. Don’t publish content that will reflect poorly on your brand, and be consistent with how often you publish new content for your audience. Content marketing is a long-term play, but it pays incredible dividends when done correctly.

## Have a visibility strategy

### Interviews & PR

Get [interviewed as a guest expert on podcasts](https://www.thinkific.com/resources/how-to-get-interviewed-on-top-podcasts/), virtual summits, as well as for traditional media including TV, radio, and print magazines.

### Public speaking

Apply to speak at live events, local [Meetup](https://www.meetup.com/) groups, and conferences that your target audience attends.