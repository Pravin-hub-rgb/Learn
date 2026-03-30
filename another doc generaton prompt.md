Achha! Aapko general prompt chahiye jisse aap kisi bhi topic ke liye gradual upgrade approach mein docs bana sakein. 

**General Prompt Structure:**

```
Topic: [Topic Name]
Context: [Kya problem hai? Kyu important hai?]
Audience: [Kaun padh raha hai? Beginner/Intermediate?]

Task: Create step-by-step documentation with gradual upgrade approach

Requirements:
1. Start with base code (what we have now)
2. Break into small incremental steps (Step 1.1, Step 1.2, etc.)
3. For each step:
   - Explain the problem we're solving
   - Show the syntax we're adding
   - Explain WHY we're adding it
   - Show the code change
4. Each step should build on previous step
5. Include real-life examples/scenarios
6. Include test cases to verify each step
7. Clear progression from simple to complex

Format:
- Step 1.1: [Specific task]
- Step 1.2: [Next specific task] 
- Step 1.3: [Next specific task]
- ...
- Final: Complete implementation

Make sure:
- No step jumps ahead
- Each step has clear purpose
- Syntax explained before use
- Code builds incrementally
```

**Example with Rate Limiting:**

```
Topic: Rate Limiting Implementation
Context: Protecting API from too many requests
Audience: Junior developers learning Next.js

Task: Create step-by-step documentation with gradual upgrade approach

Requirements:
1. Start with base code (logging only)
2. Break into small incremental steps
3. For each step:
   - Explain the problem we're solving
   - Show the syntax we're adding
   - Explain WHY we're adding it
   - Show the code change
4. Each step should build on previous step
5. Include real-life examples/scenarios
6. Include test cases to verify each step
7. Clear progression from simple to complex

Format:
- Step 1.1: Add IP tracking
- Step 1.2: Add count tracking
- Step 1.3: Add time window logic
- Step 1.4: Add window expire check
- Step 1.5: Add limit enforcement
- Final: Complete rate limiting implementation

Make sure:
- No step jumps ahead
- Each step has clear purpose
- Syntax explained before use
- Code builds incrementally
```

**Key Elements for Any Topic:**

1. **Base Code Section** - "Yeh woh code hai jahan se hum start kar rahe hain"
2. **Incremental Steps** - Har step mein ek hi cheez add karo
3. **Syntax First** - Pehle syntax explain karo, phir use karo
4. **Why Before What** - Pehle reason batao, phir implementation dikhao
5. **Real Examples** - Har step ke liye practical scenario
6. **Testing** - Har step ke baad test kaise karna hai

Aapko kisi specific topic ke liye try karna hai?