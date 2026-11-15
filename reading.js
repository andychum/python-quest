const WORLDS = [
  {
    title: 'How Python Thinks', icon: '🧠', subtitle: 'Values, names and execution order',
    concepts: [
      ['Variables and execution order', 'A variable is a name you can use to look up a value. Python usually reads a script from top to bottom. The right side of = is worked out first, then the result is assigned to the name on the left. fee += 500 adds 500 to the current fee and stores the new value.',
        `lesson_fee = 3000
bookings = 4
revenue = lesson_fee * bookings
bookings = 3
print(revenue)`,
        'Python calculates ¥12,000 while bookings is 4. Changing bookings later leaves the already calculated revenue at ¥12,000. Python only recalculates it if you run the revenue assignment again.'],
      ['Types and f-strings', 'A type tells you what kind of value you have. 3000 is an integer you can multiply. "3000" is text. An f-string inserts a value between braces into a message.',
        `minutes = "50"
total_minutes = int(minutes) * 2
print(f"{total_minutes} minutes")`,
        'int converts the text "50" to the integer 50. Python multiplies it by two, then inserts 100 into the message.']
    ],
    quiz: [
      ['What does the last line print?', `fee = 3500
bookings = 2
total = fee * bookings
bookings = 3
print(total)`, 1, [
        ['10500', 'That would be the new total if the script recalculated fee * bookings after the change.'],
        ['7000', 'total was assigned when bookings was 2. Changing bookings leaves the saved total alone.'],
        ['3500', 'That is the fee for one lesson. The assignment multiplies it by two.']]],
      ['What does the script print?', `duration = "25"
print(duration * 2)`, 2, [
        ['50', 'That requires converting duration to a number first. The quotes make this a string.'],
        ['TypeError', 'Python supports multiplying a string by an integer. It repeats the text.'],
        ['2525', 'duration is text. Multiplying it by 2 repeats the characters twice.']]],
      ['What does this Gmail subject line become?', `subject = "IELTS"
minutes = 50
print(f"{subject} lesson: {minutes} min")`, 0, [
        ['IELTS lesson: 50 min', 'The f-string substitutes IELTS and 50 inside the braces. The other words stay as written.'],
        ['{subject} lesson: {minutes} min', 'You would get literal braces in an ordinary string without the f before the opening quote.'],
        ['IELTS lesson: minutes min', 'The braces tell Python to look up the value of minutes, which is 50.']]],
      ['What is printed on the second line of output?', `fee = 3000
print(fee)
fee += 500
print(fee)`, 2, [
        ['3000', 'This is the first line. += updates fee before the second print.'],
        ['500', '500 is the amount added. += adds it to the existing fee.'],
        ['3500', 'fee += 500 reads the current fee, adds 500 and stores the result back in fee.']]]
    ]
  },
  {
    title: 'Decisions and Logic', icon: '🔀', subtitle: 'Conditions, boundaries and short-circuiting',
    concepts: [
      ['Which branch runs?', 'An if statement asks a yes-or-no question. elif is checked only if the earlier condition was false. In one if/elif/else chain, the first matching branch wins. >= includes the boundary.',
        `remaining = 0
if remaining >= 2:
    action = "Book two"
elif remaining == 1:
    action = "Book one"
else:
    action = "Offer renewal"
print(action)`,
        '0 fails both checks. Python takes the else branch and prints Offer renewal. A remaining count of exactly 2 would pass the first check.'],
      ['How and stops early', 'In A and B, Python checks A first. If A is false, the whole condition cannot pass, so Python skips B. You can use this to check a value exists before trying to use it. With or, either side can make the condition true. None means no value is available.',
        `reply = None
if reply is not None and reply.strip():
    print("Ready to review")
else:
    print("No draft")`,
        'None means no reply was supplied. The left check fails, so Python never calls strip on None. It prints No draft.']
    ],
    quiz: [
      ['Which option does the lesson package tool show?', `remaining = 2
if remaining >= 2:
    print("Book two")
elif remaining >= 1:
    print("Book one")
else:
    print("Renew")`, 1, [
        ['Book one', '2 also meets this rule, but elif is skipped once the first branch wins.'],
        ['Book two', '2 is included by >= 2, so the first branch runs.'],
        ['Book two and Book one', 'An if/elif chain runs only its first matching branch.']]],
      ['What happens when an email tool receives no draft?', `draft = None
if draft is not None and draft.strip():
    print("Review draft")
else:
    print("Draft missing")`, 0, [
        ['Prints Draft missing', 'The first check is false and Python skips strip. It takes the else branch.'],
        ['Raises an error on strip', 'strip would fail on None if it ran. and skips the right-hand check here.'],
        ['Prints Review draft', 'The draft must exist and contain text for that branch to run.']]],
      ['What does this route for a private reminder?', `private = True
task = "reminder"
if private:
    print("Human review")
elif task == "reminder":
    print("Fast model")`, 2, [
        ['Fast model', 'The reminder rule is below the privacy rule and is skipped once the first branch runs.'],
        ['Both routes', 'The two branches form one chain. Only the first matching branch runs.'],
        ['Human review', 'private is True, so the first branch wins even though this is a reminder.']]],
      ['What is printed?', `has_audio = False
has_photo = True
if has_audio or has_photo:
    print("Media input")
else:
    print("Text only")`, 1, [
        ['Text only', 'or needs just one part to be true. The photo makes the condition pass.'],
        ['Media input', 'has_photo is True, so the combined or condition is true even without audio.'],
        ['Nothing', 'Either the if branch or the else branch prints a message.']]]
    ]
  },
  {
    title: 'Loops and Collections', icon: '🔁', subtitle: 'Lists, dictionaries, filters and shared references',
    concepts: [
      ['Read records and filter them', 'A list keeps items in order. A dictionary stores fields under names called keys. Read a list comprehension by finding the source after in, the filter after if, then the value saved at the front. A for loop processes one item at a time. enumerate gives you each item and its position, starting at 0.',
        `lessons = [{"subject": "English", "minutes": 25},
           {"subject": "IELTS", "minutes": 50}]
long_lessons = [row["subject"] for row in lessons
                if row["minutes"] >= 50]
print(long_lessons)`,
        'The loop looks at both dictionaries. English fails the filter. IELTS passes. The expression at the front saves only the subject, so the result is ["IELTS"].'],
      ['Follow changes to a list', 'Several names can refer to the same list. Assigning one list name to another shares it. A slice with [:] creates a new outer list. If it contains dictionaries, the new list still points to the same dictionaries.',
        `schedule = ["English"]
snapshot = schedule[:]
live = schedule
live.append("Cantonese")
print(len(snapshot), len(schedule))`,
        'snapshot was copied with one item. live and schedule share the same list, so append makes that list two items long. Python prints 1 2.']
    ],
    quiz: [
      ['Which draft is kept?', `drafts = [{"subject": "Homework", "sent": False},
          {"subject": "Timetable", "sent": True}]
pending = [row["subject"] for row in drafts if not row["sent"]]
print(pending)`, 1, [
        ['["Timetable"]', 'Timetable has sent=True, so not row["sent"] is false for it.'],
        ['["Homework"]', 'Homework has sent=False. not makes the filter true, and only the subject is saved.'],
        ['Both subjects', 'The filter keeps only drafts where sent is false.']]],
      ['What is printed after both entries are processed?', `slots = ["09:00", "13:00"]
for index, time in enumerate(slots):
    print(index, time)`, 0, [
        ['0 09:00, then 1 13:00', 'enumerate pairs each value with its position, starting at 0 by default.'],
        ['1 09:00, then 2 13:00', 'These are human-friendly positions. Python’s default enumerate starts at 0.'],
        ['Only 0 09:00', 'The loop runs once per item, so it also prints the afternoon slot.']]],
      ['Which counts are printed?', `calendar = ["English"]
draft = calendar
draft.append("Japanese")
print(len(calendar), len(draft))`, 2, [
        ['1 2', 'That would fit a separate list. draft = calendar shares the original list.'],
        ['1 1', 'append adds Japanese to the shared list, making it two items long.'],
        ['2 2', 'calendar and draft are two names for the same list. Both see the append.']]],
      ['What do you get from the first record?', `rows = [{"subject": "Cantonese", "minutes": 25},
        {"subject": "IELTS", "minutes": 50}]
print(rows[0]["minutes"])`, 1, [
        ['50', '50 belongs to the second record, which uses index 1.'],
        ['25', 'rows[0] selects the first dictionary. ["minutes"] then retrieves 25 from it.'],
        ['Cantonese', 'That is the first record’s subject. The script asks for minutes.']]]
    ]
  },
  {
    title: 'Functions and Structure', icon: '🧩', subtitle: 'Follow calls, return values, defaults and object state',
    concepts: [
      ['Inputs and returned values', 'A function is a named block of code. The names in parentheses are parameters. Values supplied in a call are arguments. return ends the function and hands a value back to the caller. print merely displays a value.',
        `def subject(course, prefix="Reminder"):
    return f"{prefix}: {course}"

label = subject("IELTS")
print(label)`,
        'The call supplies IELTS as course and leaves prefix at its default, Reminder. The function returns "Reminder: IELTS", which label stores and print displays.'],
      ['Read an object method', 'A class describes a kind of object. A method is a function attached to an object. self refers to the particular object receiving the call. A type hint like int helps you read the code. It does not convert or check the value by itself.',
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
        'The constructor sets the starting count on each object. english.book() changes only english. The output is 1 4.']
    ],
    quiz: [
      ['Which subject does the function return?', `def title(course, prefix="Lesson"):
    return f"{prefix}: {course}"
print(title("Cantonese", prefix="Rescheduled"))`, 1, [
        ['Lesson: Cantonese', 'Lesson is the default. This call explicitly supplies a different prefix.'],
        ['Rescheduled: Cantonese', 'The named argument replaces the default prefix for this call.'],
        ['Cantonese: Rescheduled', 'The f-string places prefix first and course second.']]],
      ['What is the second line of output?', `def draft():
    print("Homework feedback")
result = draft()
print(result)`, 2, [
        ['Homework feedback', 'That is the first line, printed inside draft. There is no return statement.'],
        ['An empty line', 'The default return value is None, and print displays the word None.'],
        ['None', 'draft prints a message but returns nothing explicitly, so result is None.']]],
      ['Which counts does the package script print?', `class Package:
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
        ['0 3', 'The first call on a uses the last session. The second skips the subtraction. b is never booked.'],
        ['-1 3', 'The second call sees a.left at 0. The condition prevents the count from becoming negative.'],
        ['0 2', 'Both calls are made on a, so b keeps its starting value of 3.']]],
      ['What value and type are printed?', `def minutes(value: int):
    return value

result = minutes("50")
print(result, type(result).__name__)`, 2, [
        ['50 int', 'A type hint gives information about expected input. It does not call int automatically.'],
        ['TypeError', 'This function returns the argument without checking or converting it.'],
        ['50 str', 'The quoted argument is a string. The function returns it unchanged despite the int hint.']]]
    ]
  },
  {
    title: 'Debug Detective', icon: '🐛', subtitle: 'Trace exceptions and read tests',
    concepts: [
      ['Follow the traceback', 'A traceback is the list of calls leading to an error. Start at the bottom with the exception and the line that failed. Then look up the chain to see where the bad value came from.',
        `def parse_minutes(text):
    return int(text)

def lesson_label(text):
    return f"{parse_minutes(text)} min"

print(lesson_label("fifty"))`,
        'lesson_label called parse_minutes with "fifty". int expects digits in this string and raises ValueError. The last print never gets a result.'],
      ['Distinguish invalid input from a failed test', 'try/except tells Python how to handle a specified exception. An assert states something the code should do. A false assertion raises AssertionError and the script stops unless the error is handled.',
        `def score(text):
    try:
        return float(text)
    except ValueError:
        return None

assert score("6.5") == 6.5
assert score("pending") is None
print("Checks passed")`,
        'The ordinary case converts to 6.5. The second checks that invalid text returns None. Both assertions pass, so the last line prints.']
    ],
    quiz: [
      ['Where does the exception begin?', `def parse(text):
    return int(text)
def next_band(text):
    return parse(text) + 1

print(next_band("six"))`, 2, [
        ['At + 1', 'The function call parse(text) must finish before Python can add 1. It fails first.'],
        ['Inside print', 'Python tries to calculate the argument before calling print. The error is deeper in the call chain.'],
        ['At int(text)', 'int cannot parse "six" as digits, so this line raises ValueError.']]],
      ['What does the script print?', `try:
    sheet_band = float("pending")
except ValueError:
    sheet_band = None
print(sheet_band)`, 0, [
        ['None', 'The conversion fails with ValueError, which the except block handles by setting sheet_band to None.'],
        ['pending', 'The original text is passed to float. It is never stored in sheet_band.'],
        ['An unhandled ValueError', 'float raises ValueError, but this specific exception is caught by except.']]],
      ['Which line shows the problem with the cutoff?', `def renew(sessions):
    return sessions < 0

assert renew(-1) is True
assert renew(0) is True
print("Checks passed")`, 1, [
        ['The first assert', '-1 is below zero, so the first call returns True and that test passes.'],
        ['The second assert', '0 is not below zero. renew(0) returns False, exposing that the rule misses exactly zero.'],
        ['The print', 'The second assertion fails first, so execution never reaches print.']]],
      ['What happens when an empty booking list arrives?', `bookings = []
try:
    print(bookings[0])
except KeyError:
    print("No booking")`, 2, [
        ['Prints No booking', 'The handler catches KeyError. An invalid list position is a different error.'],
        ['Raises KeyError', 'KeyError is for missing dictionary keys. This code indexes a list.'],
        ['Raises IndexError', 'There is no item at index 0. The handler does not catch IndexError, so it is reported.']]]
    ]
  },
  {
    title: 'Files, APIs and JSON', icon: '🌐', subtitle: 'Read nested data and inspect response status',
    concepts: [
      ['Follow a JSON response', 'JSON is text that represents data. json.loads turns that text into Python values. A JSON object becomes a dictionary, an array becomes a list, and null becomes None.',
        `import json

raw = '{"drafts": [{"subject": "Cantonese lesson", "body": null}]}'
data = json.loads(raw)
first = data["drafts"][0]
print(first["subject"], first["body"])`,
        'Read from the outside in. data["drafts"] is the list, [0] finds its first record and the final keys give the subject and the None value.'],
      ['Check status before using the body', 'An API is a way for programmes to exchange requests and replies. A status tells you how the request went. 429 usually means the service is limiting requests. To go in the opposite direction and turn Python data into JSON text, use json.dumps. A successful status still leaves you responsible for checking the data inside.',
        `reply = {"status": 404, "body": {"message": "Draft missing"}}
if reply["status"] == 200:
    print(reply["body"]["subject"])
else:
    print("Check the request")`,
        'This mock reply has status 404 (not found). Python takes the else branch and never tries to fetch a subject from the error body.']
    ],
    quiz: [
      ['What is printed for a key present with null?', `import json
item = json.loads('{"subject": null}')
print(item.get("subject", "No subject"))`, 1, [
        ['No subject', 'The default only applies to an absent key. This key exists with a null value.'],
        ['None', 'JSON null becomes Python None. get returns the value stored under subject.'],
        ['null', 'That is how the value appears in JSON text. After decoding, Python uses None.']]],
      ['What happens for an empty list of drafts?', `import json
data = json.loads('{"drafts": []}')
drafts = data["drafts"]
print(drafts[0]["subject"] if drafts else "No draft")`, 2, [
        ['KeyError', 'The drafts key exists. The code selects the else part before trying to access subject.'],
        ['IndexError', 'Indexing the empty list would fail, but that expression is skipped.'],
        ['No draft', 'An empty list is false in the condition, so Python takes the else expression.']]],
      ['What does the service check report?', `response = {"status": 429, "body": {}}
if response["status"] == 200:
    print(response["body"]["draft"])
elif response["status"] == 429:
    print("Rate limited")
else:
    print("Review error")`, 0, [
        ['Rate limited', 'The status matches 429. The first branch is skipped, so the absent draft key never gets read.'],
        ['KeyError', 'The draft access is inside the status 200 branch and is skipped here.'],
        ['Review error', 'The 429 branch handles this response before the generic else.']]],
      ['Which call turns this Python record into JSON text?', `import json
record = {"ready": True, "subject": "Lesson change"}`, 1, [
        ['json.loads(record)', 'loads decodes JSON text. Here you already have a Python dictionary.'],
        ['json.dumps(record)', 'dumps serialises the Python dictionary into JSON text and writes True as true.'],
        ['str(record)', 'str gives Python’s display form, including Python’s quotes and True spelling. That is not the required JSON format.']]]
    ]
  },
  {
    title: 'Python for Data and AI', icon: '📊', subtitle: 'Read scores, comparisons and model evaluations',
    concepts: [
      ['Compare models on the same jobs', 'An evaluation is a fair trial. Give each model the same examples and use the same rules for marking. Count passes separately by job type so an easy task cannot hide an error in a harder one.',
        `results = [("Fast", "IELTS", False),
           ("Careful", "IELTS", True),
           ("Fast", "reminder", True)]
ielts = [passed for model, task, passed in results
         if model == "Fast" and task == "IELTS"]
print(sum(ielts), len(ielts))`,
        'Each group of three values is unpacked into model, task and passed. The filter keeps Fast’s IELTS trial only. sum counts True as 1 and False as 0, so this prints 0 1.'],
      ['Use quality before speed', 'A filter can remove models that miss a required quality target. Then min selects the smallest value. Its key tells it what to compare. A lambda is a short function that returns one expression.',
        `models = [{"name": "Fast", "passes": 6, "seconds": 2},
          {"name": "Careful", "passes": 9, "seconds": 5}]
eligible = [row for row in models if row["passes"] >= 8]
winner = min(eligible, key=lambda row: row["seconds"])
print(winner["name"])`,
        'Fast is quicker but fails the quality cutoff. min compares speeds only among the models still eligible, so Careful wins.']
    ],
    quiz: [
      ['How many IELTS Reading Quest trials did Fast pass, and how many did it take?', `results = [("Fast", "IELTS", False), ("Fast", "IELTS", True),
           ("Fast", "Japanese", True), ("Careful", "IELTS", True)]
scores = [passed for model, task, passed in results
          if model == "Fast" and task == "IELTS"]
print(sum(scores), len(scores))`, 1, [
        ['2 3', 'That counts Fast’s Japanese trial too. The filter requires IELTS as well as Fast.'],
        ['1 2', 'Fast has two IELTS results. One is True, so the pass count is one.'],
        ['2 2', 'The other IELTS success belongs to Careful. The model filter excludes it.']]],
      ['Which model is chosen for a Japanese-learning game?', `models = [("Quick", 6, 2), ("Steady", 8, 4), ("Deep", 9, 7)]
eligible = [row for row in models if row[1] >= 8]
print(min(eligible, key=lambda row: row[2])[0])`, 2, [
        ['Quick', 'It has the lowest time, but 6 misses the quality cutoff.'],
        ['Deep', 'It has the most passes, but the final comparison is speed among eligible models.'],
        ['Steady', '8 meets the cutoff. Its time of 4 is lower than Deep’s time of 7.']]],
      ['Why would this comparison be weak evidence for choosing a model?', `trials = {"Fast": ["greeting", "reminder"],
          "Careful": ["IELTS feedback", "Cantonese subtitles"]}`, 0, [
        ['The models were given different jobs', 'A difference in scores might come from task difficulty. Give both models the same examples and scoring rules.'],
        ['The model names must be numbers', 'Python accepts string keys. The problem is how the evaluation is designed.'],
        ['There are too many trials', 'The issue shown is that the jobs differ by model. More matched trials would make the comparison more useful.']]],
      ['What happens when no model passes the quality check?', `eligible = []
winner = min(eligible, key=lambda row: row["seconds"], default=None)
print(winner)`, 1, [
        ['ValueError', 'min would raise an error on an empty list without a default. This call supplies one.'],
        ['None', 'There are no entries to compare, so min returns the supplied default, None.'],
        ['An empty list', 'That is the input. min returns a single result, here the fallback None.']]]
    ]
  },
  {
    title: 'LLM Code Reader', icon: '🤖', subtitle: 'Inspect AI requests and validate replies',
    concepts: [
      ['Find what gets sent to a model', 'A model request is often a dictionary. Find the model field, then trace the input back to its source. Changing one field changes that part of the request. Reading the request helps you see what data would leave your programme.',
        `request = {"model": "Fast", "input": "Draft a fictional lesson reminder"}
request["model"] = "Careful"
print(request["model"], request["input"])`,
        'Only the model field is replaced. The task text stays the same. This example displays the request fields and never contacts a service.'],
      ['Validate the shape of the reply', 'Valid JSON can still contain the wrong type of information. Before using a mock reply, check it is a dictionary, then check the draft is text and has something left after strip removes outside spaces.',
        `reply = {"draft": "  "}
draft = reply.get("draft")
if isinstance(draft, str) and draft.strip():
    print("Ready for review")
else:
    print("Needs revision")`,
        'The draft is a string, but strip makes it empty. The else branch runs. A reply that passes these checks still needs a human to check its meaning and accuracy.']
    ],
    quiz: [
      ['Which input would the request contain?', `prompt = "Draft an English lesson reminder"
request = {"model": "Fast", "input": prompt}
prompt = "Assess a mock IELTS essay"
print(request["input"])`, 2, [
        ['Assess a mock IELTS essay', 'That is the later value of prompt. The request had already stored the earlier string.'],
        ['Fast', 'Fast is stored under model. The print reads the input key.'],
        ['Draft an English lesson reminder', 'The dictionary was created before prompt changed. Its input still refers to the original string.']]],
      ['What does this validation print?', `draft = ["See you at 7."]
ready = isinstance(draft, str) and bool(draft.strip())
print(ready)`, 0, [
        ['False', 'draft is a list, so the string check fails. and skips the strip call.'],
        ['True', 'A list containing a string is still a list. It fails isinstance(draft, str).'],
        ['AttributeError', 'A list has no strip method, but that part of the expression does not run.']]],
      ['What happens when the mock model returns a JSON list?', `import json
reply = json.loads('["Draft for review"]')
if isinstance(reply, dict):
    print(reply.get("draft"))
else:
    print("Check response shape")`, 1, [
        ['Draft for review', 'That text is inside a list. The script reads a draft key only from dictionaries.'],
        ['Check response shape', 'The JSON is valid but becomes a list. The dictionary check sends it to the else branch.'],
        ['JSONDecodeError', 'A JSON array is valid here. The issue is the shape the programme expects after decoding.']]],
      ['What does this result tell you about the draft?', `reply = {"draft": "Your lesson is on Monday."}
draft = reply["draft"]
print(isinstance(draft, str) and bool(draft.strip()))`, 2, [
        ['Monday is confirmed', 'The code never compares Monday with a timetable. It checks only the text field.'],
        ['The message has already been sent', 'The script only checks and prints a Boolean. It has no sending step.'],
        ['The draft is non-empty text', 'Both conditions pass. Check the lesson day against the calendar before relying on the draft.']]]
    ]
  },
  {
    title: 'AI Agent Engineer', icon: '🛠️', subtitle: 'Trace permission checks and limited fallbacks',
    concepts: [
      ['Read the tool permissions', 'A tool is a function the programme can choose to call. The allowlist names which actions may be considered. A model can suggest another name. The code checks membership before doing anything with the suggestion.',
        `allowed = {"draft_email", "lookup_slot"}
requested = "send_email"

if requested in allowed:
    print("Validate arguments")
else:
    print("Blocked")`,
        'send_email is absent from the set. The blocked branch runs. This example does not call a tool or send anything.'],
      ['Follow the stopping rules', 'A fallback is a backup plan. A for loop can have an else block that runs when the loop finishes without break. Read the loop limit, then check what ends it. return leaves the whole function immediately. Here only timeouts can reach another attempt.',
        `def captions(results):
    for result in results[:2]:
        if result == "ok":
            return "Review captions"
        if result != "timeout":
            return "Stop for review"
    return "Stop for review"

print(captions(["timeout", "ok"]))`,
        'The first result is a timeout, so the loop continues. The second is ok. The function returns Review captions after two attempts. The slice never allows a third try.']
    ],
    quiz: [
      ['What does the draft helper decide?', `allowed = {"draft_email", "lookup_slot"}
request = {"tool": "send_email", "subject": "Lesson reminder"}
print("Continue checks" if request["tool"] in allowed else "Blocked")`, 1, [
        ['Continue checks', 'The subject is plausible, but the allowlist tests the tool name. send_email is absent.'],
        ['Blocked', 'The request asks to send an email. Only drafting and slot lookup are permitted here.'],
        ['Sends the reminder', 'This code only prints a decision. It never sends email.']]],
      ['What happens to the third caption result?', `results = ["timeout", "timeout", "ok"]
for status in results[:2]:
    if status == "ok":
        print("Ready")
        break
else:
    print("Review")`, 2, [
        ['It prints Ready', 'The ok result is third. The slice includes only positions 0 and 1.'],
        ['The loop continues until ok', 'The loop reads a sliced list of two items and stops after that list ends.'],
        ['The script prints Review', 'The third result is outside the slice. The loop finishes without break, so its else runs.']]],
      ['How many mock responses does the function inspect?', `def handle(results):
    for item in results[:2]:
        if item == "blocked":
            return "Human review"
        if item == "ok":
            return "Draft"
    return "Human review"

print(handle(["blocked", "ok"]))`, 0, [
        ['One', 'blocked triggers the first return, which exits the whole function before the second value is read.'],
        ['Two', 'Two is the maximum. A return can stop the loop and function before the limit.'],
        ['Zero', 'The function enters the loop and checks the first mock result.']]],
      ['What is printed when the tool is allowed but the minutes are invalid?', `tool = "lookup_slot"
minutes = "fifty"
if tool in {"lookup_slot"} and isinstance(minutes, int):
    print("Continue")
else:
    print("Review request")`, 1, [
        ['Continue', 'The tool name passes. The text value "fifty" fails the integer check, and both checks are required.'],
        ['Review request', 'The tool passes the first check, but minutes is a string. The else branch runs.'],
        ['TypeError', 'isinstance checks the type and returns False. It does not try to convert "fifty".']]]
    ]
  },
  {
    title: 'Final Python Certification', icon: '🏆', subtitle: 'Read and explain a model router',
    concepts: [
      ['Follow a model routing table', 'A router decides where a job goes. Read the privacy check first, then the table of task names and routes. These are fictional model labels. Audio takes speech as input. Vision reads images. Compare any real models you consider on the same tasks and check quality, speed and cost. If a route goes to Python, ordinary code can handle a rule-based job like checking a time overlap.',
        `def route(job):
    if job.get("private", True):
        return "Review"
    routes = {"reminder": "Fast", "IELTS": "Careful",
              "pronunciation": "Audio", "worksheet": "Vision",
              "time clash": "Python"}
    return routes.get(job.get("kind"), "Review")

print(route({"kind": "time clash", "private": False}))`,
        'The explicit False lets the job reach the table. "time clash" maps to Python. A missing privacy flag uses the default True and stops at Review.'],
      ['Read a small end-to-end workflow', 'Read the input, the function call, the result checks and the final action in order. Separate choosing a capable model from checking its output. A suitable model can still produce a draft that needs correction. For a rule-based task such as checking two lesson times, strict < comparisons treat lessons that only touch at the boundary as separate.',
        `def next_step(route_name, reply):
    if route_name == "Review":
        return "Handle manually"
    draft = reply.get("draft")
    if isinstance(draft, str) and draft.strip():
        return "Review draft"
    return "Check reply"

print(next_step("Vision", {"draft": ""}))`,
        'The Vision route passes the first check. Its draft is empty, so the function reaches Check reply. It never marks the output ready just because the route was suitable.']
    ],
    quiz: [
      ['What route is chosen for this IELTS job?', `def route(job):
    if job.get("private", True):
        return "Review"
    return {"IELTS": "Careful"}.get(job.get("kind"), "Review")

print(route({"kind": "IELTS"}))`, 2, [
        ['Careful', 'That is the table entry for IELTS, but the first return stops the function before it gets there.'],
        ['KeyError', 'get supplies True when private is missing. Direct indexing with job["private"] would be different.'],
        ['Review', 'private is missing, so get supplies True and the first branch returns Review.']]],
      ['What does this recommendation print?', `jobs = [{"kind": "pronunciation", "audio": True},
        {"kind": "worksheet", "audio": False}]
for job in jobs:
    if job["kind"] == "pronunciation" and job["audio"]:
        print("Audio")
    elif job["kind"] == "worksheet":
        print("Vision")
    else:
        print("Review")`, 0, [
        ['Audio, then Vision', 'The first job meets both checks for Audio. The second job fails that rule and matches worksheet.'],
        ['Audio twice', 'The first rule is checked separately for each job. The worksheet job fails it.'],
        ['Vision, then Audio', 'The list is processed in order and pronunciation comes first.']]],
      ['Do these Fukuoka lesson bookings overlap?', `# Minutes since midnight in Japan time
a_start, a_end = 600, 630
b_start, b_end = 630, 655
overlap = a_start < b_end and b_start < a_end
print(overlap)`, 1, [
        ['True', 'The first check passes, but b_start equals a_end. The second strict < check is false.'],
        ['False', 'The first lesson ends exactly when the second starts. The strict < conditions exclude a shared boundary.'],
        ['TypeError', 'All four times are integers. The comparisons return Boolean values.']]],
      ['Which workflow is the best fit for checking a model’s Japanese captions for your Hong Kong video?', `route = "Audio"
result = {"draft": "Japanese captions", "status": "ok"}`, 2, [
        ['Publish because status is ok', 'ok reports that the service returned a result. It does not show the translation is faithful.'],
        ['Send the caption text to the cheapest model and publish its answer', 'A text-only comparison does not check what was spoken. Cost alone also misses caption quality.'],
        ['Check the draft against the audio with a bilingual review checklist', 'A suitable model generates a draft. Checking it against the audio can catch missing meaning, timing and names before publication.']]]
    ]
  }
];
