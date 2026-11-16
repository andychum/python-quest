const WORLDS = [
  {
    title: 'How Python Thinks', icon: '🧠', subtitle: "Read values from top to bottom",
    concepts: [
      ["Give a value a name", "A variable is a name for a value. In bookings = 4, the name bookings holds the number 4. Python usually reads one line at a time, from top to bottom. A line with = stores the answer from the right side under the name on the left. fee += 500 means ‘add 500 to the fee and save the new amount’.",
        `lesson_fee = 3000
bookings = 4
revenue = lesson_fee * bookings
bookings = 3
print(revenue)`,
        "The fee is ¥3,000 and there are 4 bookings.\nPython works out 3,000 × 4 and saves 12,000 as revenue.\nThe next line changes bookings to 3. The saved revenue is still 12,000.\nprint(revenue) shows 12000."],
      ["Tell numbers and text apart", "Python treats 50 as a number and \"50\" as text. Text in Python is called a string. int changes text made of whole-number digits into a number. An f-string fills in the blanks marked with { and }.",
        `minutes = "50"
total_minutes = int(minutes) * 2
print(f"{total_minutes} minutes")`,
        "minutes starts as the text \"50\".\nint(minutes) gives the number 50. Two lessons take 100 minutes.\nThe f-string puts 100 before the word minutes. The screen shows 100 minutes."]
    ],
    quiz: [
      ["What does the last line show?", `fee = 3500
bookings = 2
total = fee * bookings
bookings = 3
print(total)`, 1, [
        ['10500', "The code would need to work out the total again after bookings changes to 3."],
        ['7000', "The total was saved when there were 2 bookings. Two lessons at ¥3,500 each cost ¥7,000."],
        ['3500', "¥3,500 pays for one lesson. The code works out the cost of two."]]],
      ["What does Python show?", `duration = "25"
print(duration * 2)`, 2, [
        ['50', "You would get 50 if you changed the text \"25\" to a number first."],
        ['TypeError', "Python can repeat text. That works here, so there is no error."],
        ['2525', "The quotes make \"25\" text. Multiplying that text by 2 gives \"2525\"."]]],
      ["What will the email subject say?", `subject = "IELTS"
minutes = 50
print(f"{subject} lesson: {minutes} min")`, 0, [
        ['IELTS lesson: 50 min', "The blanks get filled with IELTS and 50. The words around them stay the same."],
        ['{subject} lesson: {minutes} min', "The f before the quote tells Python to fill in the blanks."],
        ['IELTS lesson: minutes min', "The blank holds the value of minutes, which is 50."]]],
      ["What does the second print show?", `fee = 3000
print(fee)
fee += 500
print(fee)`, 2, [
        ['3000', "That is what the first print shows. The fee goes up before the second print."],
        ['500', "500 is the amount added to the old fee."],
        ['3500', "+= adds 500 to 3000 and saves the new fee of 3500."]]]
    ]
  },
  {
    title: 'Decisions and Logic', icon: '🔀', subtitle: "See which rule runs",
    concepts: [
      ["Let Python choose what to do", "if means ‘do this when the answer is yes’. elif means ‘if the first answer was no, ask this next question’. else means ‘do this if none of the checks said yes’. >= means ‘at least’. == asks whether two values are equal.",
        `remaining = 0
if remaining >= 2:
    action = "Book two"
elif remaining == 1:
    action = "Book one"
else:
    action = "Offer renewal"
print(action)`,
        "There are 0 lessons left. Is 0 at least 2? No.\nIs 0 equal to 1? No.\nPython reaches else and shows Offer renewal."],
      ["Check that a draft exists first", "None means there is no value. With and, both checks need a yes. If the first check says no, Python skips the second. With or, one yes is enough. strip() removes spaces from the start and end of text.",
        `reply = None
if reply is not None and reply.strip():
    print("Ready to review")
else:
    print("No draft")`,
        "reply is None. There is no draft.\nIs there a draft? No. Python skips reply.strip().\nThe else part shows No draft."]
    ],
    quiz: [
      ["Which message does the tutor see?", `remaining = 2
if remaining >= 2:
    print("Book two")
elif remaining >= 1:
    print("Book one")
else:
    print("Renew")`, 1, [
        ['Book one', "The first rule wins, so Python skips the second rule."],
        ['Book two', "2 counts as ‘at least 2’, so the first rule wins."],
        ['Book two and Book one', "Python stops looking for a rule after the first one that fits."]]],
      ["What happens if there is no draft?", `draft = None
if draft is not None and draft.strip():
    print("Review draft")
else:
    print("Draft missing")`, 0, [
        ['Prints Draft missing', "There is no draft. The first check says no, so Python skips strip and shows Draft missing."],
        ['Raises an error on strip', "strip would fail on None, but Python skips that part after the first check says no."],
        ['Prints Review draft', "To show Review draft, the script needs a draft with some text."]]],
      ["Where does the private reminder go?", `private = True
task = "reminder"
if private:
    print("Human review")
elif task == "reminder":
    print("Fast model")`, 2, [
        ['Fast model', "Python checks whether the job is private before it checks the kind of job."],
        ['Both routes', "Both are part of one if and elif group. Only one part can run."],
        ['Human review', "private is True, so the first rule sends the job to a person."]]],
      ["What message does Python show?", `has_audio = False
has_photo = True
if has_audio or has_photo:
    print("Media input")
else:
    print("Text only")`, 1, [
        ['Text only', "There is a photo. With or, one yes is enough."],
        ['Media input', "The photo check says yes, so Python shows Media input."],
        ['Nothing', "There is a message in both paths. One of them will be shown."]]]
    ]
  },
  {
    title: 'Loops and Collections', icon: '🔁', subtitle: "Follow lists and lesson records",
    concepts: [
      ["Keep the lessons you need", "A list keeps items in order. A dictionary keeps details under labels, such as subject or minutes. Python counts list positions from 0. A for loop looks at one item at a time. enumerate gives you the item and its position.",
        `lessons = [{"subject": "English", "minutes": 25},
           {"subject": "IELTS", "minutes": 50}]
long_lessons = [row["subject"] for row in lessons
                if row["minutes"] >= 50]
print(long_lessons)`,
        "Python looks at English first. It lasts 25 minutes, so it is skipped.\nIELTS lasts 50 minutes, so Python keeps it.\nThe part at the front, row[\"subject\"], saves only the name. The new list holds just IELTS."],
      ["Copy a timetable or share it?", "Think of two labels stuck to the same timetable. A change to that timetable shows up under both names. Using [:] makes a new outer list. If items inside it are dictionaries, the two lists can still share those dictionaries.",
        `schedule = ["English"]
snapshot = schedule[:]
live = schedule
live.append("Cantonese")
print(len(snapshot), len(schedule))`,
        "schedule starts with just English. snapshot is a copy with one item.\nlive is a second name for schedule. append adds Cantonese to that shared list.\nThe copy has 1 item. The shared list has 2. Python shows 1 2."]
    ],
    quiz: [
      ["Which email subject stays on the list?", `drafts = [{"subject": "Homework", "sent": False},
          {"subject": "Timetable", "sent": True}]
pending = [row["subject"] for row in drafts if not row["sent"]]
print(pending)`, 1, [
        ['["Timetable"]', "Timetable has already been sent. The rule keeps only drafts that have yet to be sent."],
        ['["Homework"]', "Homework has sent set to False. Python keeps its subject."],
        ['Both subjects', "One draft has already been sent. It fails the check."]]],
      ["What does Python show for the two lesson times?", `slots = ["09:00", "13:00"]
for index, time in enumerate(slots):
    print(index, time)`, 0, [
        ['0 09:00, then 1 13:00', "enumerate starts at 0. It pairs 0 with the first time and 1 with the next."],
        ['1 09:00, then 2 13:00', "Python starts counting here from 0."],
        ['Only 0 09:00', "There are two times on the list. The loop shows each one."]]],
      ["Which two counts does Python show?", `calendar = ["English"]
draft = calendar
draft.append("Japanese")
print(len(calendar), len(draft))`, 2, [
        ['1 2', "These counts would fit a copy. Here draft and calendar share a list."],
        ['1 1', "append adds Japanese to the list. That makes two items."],
        ['2 2', "Both names point to the same list. They both see the new item."]]],
      ["What is saved under minutes in the first lesson?", `rows = [{"subject": "Cantonese", "minutes": 25},
        {"subject": "IELTS", "minutes": 50}]
print(rows[0]["minutes"])`, 1, [
        ['50', "50 comes from the second item. That item is at position 1."],
        ['25', "Position 0 gives the first item. Its minutes value is 25."],
        ['Cantonese', "Cantonese is under subject. The code asks for minutes."]]]
    ]
  },
  {
    title: 'Functions and Structure', icon: '🧩', subtitle: "Follow a function from input to result",
    concepts: [
      ["Give a function a job", "A function is a set of steps with a name. Call it by using its name and brackets, like subject(\"IELTS\"). return hands the result back. print shows a value on screen. A default is a value Python uses if you leave that input out.",
        `def subject(course, prefix="Reminder"):
    return f"{prefix}: {course}"

label = subject("IELTS")
print(label)`,
        "The call gives course the value IELTS.\nThe call leaves out prefix, so Python uses Reminder.\nThe function gives back Reminder: IELTS. label saves it, then print shows it."],
      ["Keep each lesson package separate", "A class is a plan for making things in code. Each package made from the plan gets its own lesson count. A method is an action you can ask a package to do. self means ‘this package’. The int label tells readers to expect a whole number. It does not check or change the value.",
        `class Package:
    def __init__(self, left: int):
        self.left = left

    def book(self):
        if self.left > 0:
            self.left -= 1

english = Package(2)
cantonese = Package(4)
english.book()
print(english.left, cantonese.left)`,
        "The English package starts with 2 lessons. The Cantonese package starts with 4.\nenglish.book() uses one English lesson. That leaves 1.\nCantonese stays at 4. Python shows 1 4."]
    ],
    quiz: [
      ["What will the subject say?", `def title(course, prefix="Lesson"):
    return f"{prefix}: {course}"
print(title("Cantonese", prefix="Rescheduled"))`, 1, [
        ['Lesson: Cantonese', "Lesson is used only when the call leaves out prefix."],
        ['Rescheduled: Cantonese', "The call gives prefix a new value, Rescheduled. It goes before Cantonese."],
        ['Cantonese: Rescheduled', "Look at the f-string. It puts prefix first."]]],
      ["What does the second print show?", `def draft():
    print("Homework feedback")
result = draft()
print(result)`, 2, [
        ['Homework feedback', "That is the first line. It comes from the print inside draft."],
        ['An empty line', "print shows the word None here. It does not leave the line blank."],
        ['None', "draft shows some text but gives no value back. Python uses None."]]],
      ["How many lessons are left in packages a and b?", `class Package:
    def __init__(self, left):
        self.left = left
    def book(self):
        if self.left > 0:
            self.left -= 1

a = Package(1)
b = Package(3)
a.book()
a.book()
print(a.left, b.left)`, 0, [
        ['0 3', "a uses its last lesson on the first call. The next call changes nothing. b keeps its 3 lessons."],
        ['-1 3', "On the second call, a has 0. The rule stops it from losing another lesson."],
        ['0 2', "Both calls use a. The code never books a lesson from b."]]],
      ["Does Python see the result as a number or as text?", `def minutes(value: int):
    return value

result = minutes("50")
print(result, type(result).__name__)`, 2, [
        ['50 int', "The int label says what the function expects. The code never changes the input to an integer."],
        ['TypeError', "Python does not check the int label here. The function just gives back what you put in."],
        ['50 str', "The input \"50\" is text. Python shows str, the short name for that type."]]]
    ]
  },
  {
    title: 'Debug Detective', icon: '🐛', subtitle: "Find where code breaks",
    concepts: [
      ["Find the line where the code broke", "When code fails, Python shows a traceback. Think of it as a trail showing how the code reached the problem. Read the bottom first to find the kind of error. Then find the line and look up the trail for where the value came from.",
        `def parse_minutes(text):
    return int(text)

def lesson_label(text):
    return f"{parse_minutes(text)} min"

print(lesson_label("fifty"))`,
        "lesson_label is given the word \"fifty\". It passes that word to parse_minutes.\nint can read \"50\", but it cannot read \"fifty\" as a number. It raises ValueError.\nThe final print has no result to show."],
      ["Read small checks for your code", "try means ‘give this a go’. except means ‘if this kind of error happens, do this instead’. assert is a check that says ‘this should be true’. If the check fails, Python reports an AssertionError and usually stops.",
        `def score(text):
    try:
        return float(text)
    except ValueError:
        return None

assert score("6.5") == 6.5
assert score("pending") is None
print("Checks passed")`,
        "The first check tries \"6.5\". float turns the text into the number 6.5.\nThe second check tries \"pending\". That cannot turn into a number, so except gives back None.\nBoth checks pass. Python shows Checks passed."]
    ],
    quiz: [
      ["Which line causes the error?", `def parse(text):
    return int(text)
def next_band(text):
    return parse(text) + 1

print(next_band("six"))`, 2, [
        ['At + 1', "Python must get a number from parse before it can add 1."],
        ['Inside print', "The code has to work out what to print first. It breaks before print runs."],
        ['At int(text)', "int tries to read \"six\" as a number. It cannot, so the error starts there."]]],
      ["What does Python show?", `try:
    sheet_band = float("pending")
except ValueError:
    sheet_band = None
print(sheet_band)`, 0, [
        ['None', "float cannot turn \"pending\" into a number. except sets the value to None."],
        ['pending', "The text goes into float. That call fails before the text can be saved as sheet_band."],
        ['An unhandled ValueError', "The except block catches that kind of error and lets the script keep going."]]],
      ["Which test fails when the package has no lessons left?", `def renew(sessions):
    return sessions < 0

assert renew(-1) is True
assert renew(0) is True
print("Checks passed")`, 1, [
        ['The first assert', "-1 is less than 0. The first check passes."],
        ['The second assert', "0 is equal to 0, so it fails the ‘less than 0’ rule. The test expected it to pass."],
        ['The print', "Python stops at the second check. It never reaches print."]]],
      ["What happens when the booking list is empty?", `bookings = []
try:
    print(bookings[0])
except KeyError:
    print("No booking")`, 2, [
        ['Prints No booking', "The except line only catches a missing dictionary label. This is an empty list."],
        ['Raises KeyError', "KeyError is for a missing dictionary label. bookings is a list."],
        ['Raises IndexError', "There is no item at position 0. That causes IndexError, which the except line does not catch."]]]
    ]
  },
  {
    title: 'Files, APIs and JSON', icon: '🌐', subtitle: "Read information from another programme",
    concepts: [
      ["Open a JSON reply one layer at a time", "JSON is a way to pack information into text. json.loads unpacks it for Python. A group of named details becomes a dictionary. A row of items in square brackets becomes a list. null means there is no value. Python calls that None. json.dumps packs Python data back into JSON text.",
        `import json

raw = '{"drafts": [{"subject": "Cantonese lesson", "body": null}]}'
data = json.loads(raw)
first = data["drafts"][0]
print(first["subject"], first["body"])`,
        "json.loads opens the text and gives Python a dictionary.\n[\"drafts\"] finds the list. [0] picks its first draft.\nPython shows the draft’s subject and None because its body is null."],
      ["Read the reply number first", "An API lets two programmes ask each other for things. A reply includes a status number that tells you how the request went. Here, 200 means the request worked, 404 means the item was not found, and 429 means the service is limiting requests.",
        `reply = {"status": 404, "body": {"message": "Draft missing"}}
if reply["status"] == 200:
    print(reply["body"]["subject"])
else:
    print("Check the request")`,
        "Python checks the status. It is 404, so the 200 part is skipped.\nPython takes the else part and shows Check the request. It never looks for a subject."]
    ],
    quiz: [
      ["What does Python show when subject is null?", `import json
item = json.loads('{"subject": null}')
print(item.get("subject", "No subject"))`, 1, [
        ['No subject', "The backup text is used only if subject is missing. That label is there."],
        ['None', "JSON uses null. Python unpacks it as None and shows that value."],
        ['null', "null is the word in the original JSON text. Python shows None."]]],
      ["What happens when the list of drafts is empty?", `import json
data = json.loads('{"drafts": []}')
drafts = data["drafts"]
print(drafts[0]["subject"] if drafts else "No draft")`, 2, [
        ['KeyError', "The drafts label is there. The code skips the part that asks for a subject."],
        ['IndexError', "The list has no first item, but Python skips the part that would try to read it."],
        ['No draft', "The list is empty. Python takes the part after else."]]],
      ["Which message fits this reply?", `response = {"status": 429, "body": {}}
if response["status"] == 200:
    print(response["body"]["draft"])
elif response["status"] == 429:
    print("Rate limited")
else:
    print("Review error")`, 0, [
        ['Rate limited', "429 matches the second check. Python shows Rate limited."],
        ['KeyError', "The 200 part would ask for a draft. Python skips it because the status is 429."],
        ['Review error', "The special check for 429 comes before the general else part."]]],
      ["Which line turns the Python record into JSON text?", `import json
record = {"ready": True, "subject": "Lesson change"}`, 1, [
        ['json.loads(record)', "loads reads JSON text and turns it into Python data. This value is already a dictionary."],
        ['json.dumps(record)', "dumps turns the dictionary into JSON text. It writes True as true."],
        ['str(record)', "str shows the value in Python’s own style. Use dumps to produce JSON."]]]
    ]
  },
  {
    title: 'Python for Data and AI', icon: '📊', subtitle: "Compare AI models on the same jobs",
    concepts: [
      ["Give two AI models a fair test", "A model is the AI system doing a job. To compare two models fairly, give them the same jobs and use the same rules to mark their answers. Keep scores for reminders separate from scores for IELTS work.",
        `results = [("Fast", "IELTS", False),
           ("Careful", "IELTS", True),
           ("Fast", "reminder", True)]
ielts = [passed for model, task, passed in results
         if model == "Fast" and task == "IELTS"]
print(sum(ielts), len(ielts))`,
        "Each row gives a model name, a job and a pass or fail.\nPython keeps only the Fast model’s IELTS result. It is False.\nsum counts passes and len counts tries. Python shows 0 1: zero passes in one try."],
      ["Check the quality, then compare speed", "A filter keeps only the items that pass a rule. min picks the smallest item using a rule you give it. Here key tells min to compare seconds. lambda is a short way to write a tiny function.",
        `models = [{"name": "Fast", "passes": 6, "seconds": 2},
          {"name": "Careful", "passes": 9, "seconds": 5}]
eligible = [row for row in models if row["passes"] >= 8]
winner = min(eligible, key=lambda row: row["seconds"])
print(winner["name"])`,
        "Only models with at least 8 passes can stay on the list.\nFast gets 6 and is removed. Careful gets 9 and stays.\nmin picks the fastest model still on the list. Python shows Careful."]
    ],
    quiz: [
      ["How many IELTS trials did Fast pass? How many did it try?", `results = [("Fast", "IELTS", False), ("Fast", "IELTS", True),
           ("Fast", "Japanese", True), ("Careful", "IELTS", True)]
scores = [passed for model, task, passed in results
          if model == "Fast" and task == "IELTS"]
print(sum(scores), len(scores))`, 1, [
        ['2 3', "That includes Fast’s Japanese trial. The filter keeps only IELTS trials."],
        ['1 2', "Fast tried IELTS twice. It passed once."],
        ['2 2', "One of the IELTS passes belongs to Careful. The filter keeps only Fast."]]],
      ["Which AI model does the game pick?", `models = [("Quick", 6, 2), ("Steady", 8, 4), ("Deep", 9, 7)]
eligible = [row for row in models if row[1] >= 8]
print(min(eligible, key=lambda row: row[2])[0])`, 2, [
        ['Quick', "Quick is fast, but it needs 8 passes. It only has 6."],
        ['Deep', "Deep has more passes and meets the rule. Steady also meets it and takes less time."],
        ['Steady', "Steady meets the rule with 8 passes. It takes 4 seconds instead of Deep’s 7."]]],
      ["Why is this a hard way to compare the two models?", `trials = {"Fast": ["greeting", "reminder"],
          "Careful": ["IELTS feedback", "Cantonese subtitles"]}`, 0, [
        ['The models were given different jobs', "The jobs may vary in difficulty. Give both models the same work to make the test fair."],
        ['The model names must be numbers', "Python can use names like Fast as labels. The issue is what each model was asked to do."],
        ['There are too many trials', "The list is short. Adding more jobs that both models try would help."]]],
      ["What does Python show if no model passes the check?", `eligible = []
winner = min(eligible, key=lambda row: row["seconds"], default=None)
print(winner)`, 1, [
        ['ValueError', "That error can happen on an empty list. Here the code gives min a backup value."],
        ['None', "There is nothing to compare, so min uses its backup value, None."],
        ['An empty list', "The empty list goes in. min gives back the chosen backup, None."]]]
    ]
  },
  {
    title: 'LLM Code Reader', icon: '🤖', subtitle: "See what AI gets and what it gives back",
    concepts: [
      ["See what goes into an AI request", "A request is what your programme would send to the AI. In this example, model names the AI to use and input holds the job you give it. Follow both fields to see which information would be sent.",
        `request = {"model": "Fast", "input": "Draft a fictional lesson reminder"}
request["model"] = "Careful"
print(request["model"], request["input"])`,
        "The request starts with Fast and a reminder job.\nThe next line changes model to Careful. The reminder stays the same.\nThe example shows those two fields on screen."],
      ["Check what comes back from AI", "An AI reply can have the wrong kind of value. A draft should be text with something in it. isinstance(draft, str) asks ‘is this text?’. strip() removes spaces at both ends, so a draft made only of spaces becomes empty. bool asks if anything is left.",
        `reply = {"draft": "  "}
draft = reply.get("draft")
if isinstance(draft, str) and draft.strip():
    print("Ready for review")
else:
    print("Needs revision")`,
        "draft is text, so the first check says yes.\nstrip() leaves nothing. The second check says no.\nPython shows Needs revision. Even when both checks say yes, you still need to check the meaning."]
    ],
    quiz: [
      ["Which job would the AI get?", `prompt = "Draft an English lesson reminder"
request = {"model": "Fast", "input": prompt}
prompt = "Assess a mock IELTS essay"
print(request["input"])`, 2, [
        ['Assess a mock IELTS essay', "That is the new prompt. The request already saved the old one."],
        ['Fast', "Fast is the model. The code asks for the input."],
        ['Draft an English lesson reminder', "The request saved the reminder before prompt changed."]]],
      ["What does the check show?", `draft = ["See you at 7."]
ready = isinstance(draft, str) and bool(draft.strip())
print(ready)`, 0, [
        ['False', "The value is a list. The first check says no, and Python skips strip."],
        ['True', "The list has text inside it, but the whole value is still a list."],
        ['AttributeError', "A list cannot use strip here. Python skips that call because the first check says no."]]],
      ["What happens when the AI gives back a list?", `import json
reply = json.loads('["Draft for review"]')
if isinstance(reply, dict):
    print(reply.get("draft"))
else:
    print("Check response shape")`, 1, [
        ['Draft for review', "The text is inside a list. This code checks for a dictionary first."],
        ['Check response shape', "Python reads the JSON as a list. It shows Check response shape."],
        ['JSONDecodeError', "This is valid JSON. The reply just has a different form from the one the code expects."]]],
      ["What does this check tell you about the draft?", `reply = {"draft": "Your lesson is on Monday."}
draft = reply["draft"]
print(isinstance(draft, str) and bool(draft.strip()))`, 2, [
        ['Monday is confirmed', "The code asks whether there is text. It never checks which day the lesson is on."],
        ['The message has already been sent', "The code checks the draft. There is no step that sends it."],
        ['The draft is non-empty text', "The draft is text with something in it. You still need to check the day against the calendar."]]]
    ]
  },
  {
    title: 'AI Agent Engineer', icon: '🛠️', subtitle: "Check what AI tools can do",
    concepts: [
      ["Check what an AI is allowed to do", "A tool is an action your programme can use, such as making an email draft. An allowlist names the actions that are allowed. in asks whether something is on that list.",
        `allowed = {"draft_email", "lookup_slot"}
requested = "send_email"

if requested in allowed:
    print("Validate arguments")
else:
    print("Blocked")`,
        "The list allows making a draft and looking up a time.\nThe request asks to send an email. That action is missing from the list.\nPython shows Blocked."],
      ["Set a limit on backup tries", "A fallback is a backup plan. [:2] takes at most the first two items. return ends the whole function. break stops a loop. A loop’s else runs if the loop finishes without hitting break.",
        `def captions(results):
    for result in results[:2]:
        if result == "ok":
            return "Review captions"
        if result != "timeout":
            return "Stop for review"
    return "Stop for review"

print(captions(["timeout", "ok"]))`,
        "The first result is timeout. The code moves to the next result.\nThe second result is ok. return ends the function and gives back Review captions.\nThe first-two-items rule rules out a third try."]
    ],
    quiz: [
      ["What does the email helper do?", `allowed = {"draft_email", "lookup_slot"}
request = {"tool": "send_email", "subject": "Lesson reminder"}
print("Continue checks" if request["tool"] in allowed else "Blocked")`, 1, [
        ['Continue checks', "The text has a subject, but the rule checks the name of the action. send_email is missing."],
        ['Blocked', "The list allows drafts and time lookups. Sending an email is outside that list."],
        ['Sends the reminder', "The example reports a choice. Nothing sends the email."]]],
      ["What does Python show after the two caption tries?", `results = ["timeout", "timeout", "ok"]
for status in results[:2]:
    if status == "ok":
        print("Ready")
        break
else:
    print("Review")`, 2, [
        ['It prints Ready', "ok is the third item. The slice keeps only the first two."],
        ['The loop continues until ok', "There are only two items in the slice. The loop stops there."],
        ['The script prints Review', "Neither of the first two tries is ok. The loop finishes and its else shows Review."]]],
      ["How many results does the function look at?", `def handle(results):
    for item in results[:2]:
        if item == "blocked":
            return "Human review"
        if item == "ok":
            return "Draft"
    return "Human review"

print(handle(["blocked", "ok"]))`, 0, [
        ['One', "The first item is blocked, so return ends the function straight away."],
        ['Two', "The code has room for two tries. It leaves after the first one."],
        ['Zero', "The code does enter the loop, then checks the first item."]]],
      ["What happens when the tool name is allowed but minutes is text?", `tool = "lookup_slot"
minutes = "fifty"
if tool in {"lookup_slot"} and isinstance(minutes, int):
    print("Continue")
else:
    print("Review request")`, 1, [
        ['Continue', "The action name is allowed, but \"fifty\" is text. Both checks need a yes."],
        ['Review request', "lookup_slot passes the first check. The second check says no because minutes is text."],
        ['TypeError', "The type check gives back False. It does not try to turn the word into a number."]]]
    ]
  },
  {
    title: 'Final Python Certification', icon: '🏆', subtitle: "Choose the right tool for a job",
    concepts: [
      ["Send each job to the right place", "A router is a set of rules that sends each job to the right place. It can send audio to an AI that can listen, photos to an AI that can read images, or work that needs care to a person. Ordinary Python can check fixed rules, like whether two lessons overlap.",
        `def route(job):
    if job.get("private", True):
        return "Review"
    routes = {"reminder": "Fast", "IELTS": "Careful",
              "pronunciation": "Audio", "worksheet": "Vision",
              "time clash": "Python"}
    return routes.get(job.get("kind"), "Review")

print(route({"kind": "time clash", "private": False}))`,
        "The time clash job says private is False, so it reaches the list of routes.\nThe entry for time clash is Python. The function gives back Python.\nIf private were missing, get would use True and send the job to Review first."],
      ["Check the answer before using it", "Read what goes into the function, then follow each check in order. Picking a model is one step. Checking what came back is another. When comparing lesson times, one lesson ending just as another begins is not an overlap.",
        `def next_step(route_name, reply):
    if route_name == "Review":
        return "Handle manually"
    draft = reply.get("draft")
    if isinstance(draft, str) and draft.strip():
        return "Review draft"
    return "Check reply"

print(next_step("Vision", {"draft": ""}))`,
        "The route is Vision, so the code gets past the first check.\nThe draft has no text in it. It fails the next check.\nThe last line gives back Check reply. You still need to look at the result before using it."]
    ],
    quiz: [
      ["Where does this IELTS job go?", `def route(job):
    if job.get("private", True):
        return "Review"
    return {"IELTS": "Careful"}.get(job.get("kind"), "Review")

print(route({"kind": "IELTS"}))`, 2, [
        ['Careful', "IELTS would go to Careful if it got to the list of routes. The privacy check stops it first."],
        ['KeyError', "get has a backup value. When private is missing, it uses True."],
        ['Review', "There is no private value, so Python uses True and sends the job to Review."]]],
      ["Which two tools does the script pick, in order?", `jobs = [{"kind": "pronunciation", "audio": True},
        {"kind": "worksheet", "audio": False}]
for job in jobs:
    if job["kind"] == "pronunciation" and job["audio"]:
        print("Audio")
    elif job["kind"] == "worksheet":
        print("Vision")
    else:
        print("Review")`, 0, [
        ['Audio, then Vision', "The first job is pronunciation with audio. The second is a worksheet, so it goes to Vision."],
        ['Audio twice', "The second job is a worksheet. It fails the Audio check."],
        ['Vision, then Audio', "The list starts with pronunciation. Python reads the jobs in that order."]]],
      ["Do these two lesson times overlap?", `# Minutes since midnight in Japan time
a_start, a_end = 600, 630
b_start, b_end = 630, 655
overlap = a_start < b_end and b_start < a_end
print(overlap)`, 1, [
        ['True', "The second lesson starts just as the first one ends. That makes the second < check false."],
        ['False', "The start of one lesson equals the end of the other. There is no time when both lessons are running."],
        ['TypeError', "All four times are numbers. Python can compare them."]]],
      ["How should you check the Japanese captions before publishing the Hong Kong video?", `route = "Audio"
result = {"draft": "Japanese captions", "status": "ok"}`, 2, [
        ['Publish because status is ok', "ok says the service returned something. It does not tell you whether the captions are right."],
        ['Send the caption text to the cheapest model and publish its answer', "The cheapest model might work with text only. The review also needs the original audio."],
        ['Check the draft against the audio with a bilingual review checklist', "Listen to the audio and check the words, names and timing in the draft before publishing."]]]
    ]
  }
];
