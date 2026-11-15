const INTERMEDIATE = [
  {
    title: 'Which names share the same list?',
    explanation: 'Imagine two labels stuck on the same box. If you add something through either label, both names see it. A slice like lessons[:] makes a new outer list. The items inside it are still shared if they are objects such as dictionaries.',
    code: `lessons = ["English"]
alias = lessons
snapshot = lessons[:]
alias.append("IELTS")
print(f"Live: {len(lessons)}, saved: {len(snapshot)}")`,
    trace: 'Before append, both lists contain one item. alias points to lessons, which grows to two. snapshot is a separate list and stays at one. The f-string puts those numbers into the message.',
    quiz: ['What changes if snapshot = lessons replaces snapshot = lessons[:]?','lessons = ["English"]\nalias = lessons\nsnapshot = lessons[:]\nalias.append("IELTS")\nprint(len(lessons), len(snapshot))', ['Both counts are 2', 'Both counts are 1', 'Only the saved count is 2', 'Python raises an error'], 0, 'All three names now point to the same list. Appending once changes what every name sees.'],
    lab: ['Keep a copy of the lesson list', 'Take a snapshot before you add Cantonese. Then print the current and saved counts in that order.',
      'lessons = ["English"]\n# Make a copy, add Cantonese, then print both counts.', '2 1',
      'lessons = ["English"]\nsnapshot = lessons[:]\nlessons.append("Cantonese")\nprint(len(lessons), len(snapshot))',
      'The slice copies the outer list while it has one item. append changes only lessons.']
  },
  {
    title: 'Read a decision from top to bottom',
    explanation: 'Think of if and elif as a queue of doors. The first door that opens wins. Put rules that must always win first. With and, Python stops checking as soon as the left part is false.',
    code: `def pick(task, has_audio):
    if has_audio and task == "pronunciation":
        return "Audio"
    if task == "greeting":
        return "Fast"
    return "Review"

print(pick("pronunciation", False))`,
    trace: 'has_audio is False, so the first return is skipped. The task is not a greeting either. The function reaches Review.',
    quiz: ['What does pick("pronunciation", True) return with the function below?', 'def pick(task, has_audio):\n    if has_audio and task == "pronunciation":\n        return "Audio"\n    if task == "greeting":\n        return "Fast"\n    return "Review"', ['Review', 'Fast', 'Audio', 'True'], 2, 'Both checks in the first rule are now true, so return ends the function immediately.'],
    lab: ['Put privacy before convenience', 'Return Review if a task contains private details. Otherwise return Fast for a greeting or Review for any other task. Print the routes for a private greeting, a fictional greeting and IELTS feedback without private details, in that order.',
      'def pick(task, private):\n    # Put the privacy rule first.\n    pass\n\nprint(pick("greeting", True))\nprint(pick("greeting", False))\nprint(pick("IELTS", False))', 'Review\nFast\nReview',
      'def pick(task, private):\n    if private:\n        return "Review"\n    if task == "greeting":\n        return "Fast"\n    return "Review"\n\nprint(pick("greeting", True))\nprint(pick("greeting", False))\nprint(pick("IELTS", False))',
      'The same greeting gets different routes because the first condition checks privacy before the task name.']
  },
  {
    title: 'Filter a list of records',
    explanation: 'Read a list comprehension in this order: where the items come from, which items to keep, and what to save from each one. A record here is a dictionary with fields like subject and minutes.',
    code: `lessons = [
    {"subject": "English", "minutes": 25},
    {"subject": "IELTS", "minutes": 50},
    {"subject": "Cantonese", "minutes": 50},
]
long_lessons = [row["subject"] for row in lessons if row["minutes"] >= 50]
print(", ".join(long_lessons))`,
    trace: 'Start with English and skip it. Keep IELTS and Cantonese in that order. The expression at the front says to save only each subject name.',
    quiz: ['What is stored in names?', 'rows = [{"task": "Draft", "done": False}, {"task": "Review", "done": True}]\nnames = [row["task"] for row in rows if not row["done"]]', ['Both task names', '["Review"]', '[]', '["Draft"]'], 3, 'not False becomes True, so the pending Draft row is kept. Only its task name goes into the list.'],
    lab: ['Count the unfinished tasks', 'Use a list comprehension to collect the names of unfinished tasks. Print their names joined by a comma and a space, then print how many there are.',
      'tasks = [{"name": "Draft", "done": False},\n         {"name": "Check scores", "done": True},\n         {"name": "Update timetable", "done": False}]\n# Filter tasks and print the names and count.',
      'Draft, Update timetable\n2',
      'tasks = [{"name": "Draft", "done": False},\n         {"name": "Check scores", "done": True},\n         {"name": "Update timetable", "done": False}]\nopen_tasks = [row["name"] for row in tasks if not row["done"]]\nprint(", ".join(open_tasks))\nprint(len(open_tasks))',
      'Use each row to decide whether to keep it. Save the name of each row that passes the filter.']
  },
  {
    title: 'Follow a class and its method',
    explanation: 'A class is a template for objects. Each lesson package is a separate object with its own remaining count. self means the particular object receiving the call. A type hint such as int is a label for readers and tools. Python does not enforce it automatically.',
    code: `class Package:
    def __init__(self, remaining: int):
        self.remaining = remaining

    def book(self):
        if self.remaining == 0:
            return "Renew"
        self.remaining -= 1
        return "Booked"

package = Package(1)
print(package.book(), package.book())`,
    trace: 'The first call changes remaining from 1 to 0 and returns Booked. The second call sees the same object at 0 and returns Renew.',
    quiz: ['What does this print?', 'class Counter:\n    def __init__(self):\n        self.value = 0\n\nfirst = Counter()\nsecond = Counter()\nfirst.value += 1\nprint(first.value, second.value)', ['1 1', '1 0', '0 0', '0 1'], 1, 'Each Counter() call creates a new object. Changing first.value does not change second.value.'],
    lab: ['Read two lesson packages independently', 'Finish the book method. It should subtract one only when the package has sessions left. A starts with one session, B starts with two. Book twice on A, then print the remaining sessions on A and B.',
      'class Package:\n    def __init__(self, remaining):\n        self.remaining = remaining\n\n    def book(self):\n        pass\n\na = Package(1)\nb = Package(2)\na.book()\na.book()\nprint(a.remaining, b.remaining)',
      '0 2',
      'class Package:\n    def __init__(self, remaining):\n        self.remaining = remaining\n\n    def book(self):\n        if self.remaining > 0:\n            self.remaining -= 1\n\na = Package(1)\nb = Package(2)\na.book()\na.book()\nprint(a.remaining, b.remaining)',
      'Only the first call changes A. The second call sees zero and skips the subtraction. B never receives a call.'
    ]
  },
  {
    title: 'Trace an error through two functions',
    explanation: 'A traceback shows the chain of calls that led to a problem. Start with the error at the bottom, find the line that failed, then look higher to see who passed it the bad value. Test an ordinary case and a broken case before calling the repair finished.',
    code: `def parse_minutes(text):
    return int(text)

def lesson_summary(minutes):
    try:
        return f"{parse_minutes(minutes)} min"
    except ValueError:
        return "Check minutes"

assert lesson_summary("25") == "25 min"
assert lesson_summary("twenty") == "Check minutes"
print("Both checks passed")`,
    trace: 'The first call converts the text and returns a summary. The second fails inside int. The exception travels up to lesson_summary, where except handles it.',
    quiz: ['Which expression causes the ValueError?', 'def parse(text):\n    return int(text)\n\ndef next_score(text):\n    return parse(text) + 1\n\nprint(next_score("six"))', ['print(...)', 'int(text)', '+ 1', 'def parse(text)'], 1, 'int cannot convert the word six. The addition never runs because parse raises an error first.'],
    lab: ['Test a score boundary', 'Finish read_band. Convert text to a number with float. Return the number only when it is between 0 and 9 inclusive, otherwise return None. Keep all four checks.',
      'def read_band(text):\n    pass\n\nassert read_band("6.5") == 6.5\nassert read_band("9") == 9\nassert read_band("10") is None\nassert read_band("oops") is None\nprint("Four checks passed")',
      'Four checks passed',
      'def read_band(text):\n    try:\n        band = float(text)\n    except ValueError:\n        return None\n    return band if 0 <= band <= 9 else None\n\nassert read_band("6.5") == 6.5\nassert read_band("9") == 9\nassert read_band("10") is None\nassert read_band("oops") is None\nprint("Four checks passed")',
      'The conversion and range check solve different problems. “10” converts successfully but is outside the valid range.'
    ]
  },
  {
    title: 'Unpack a nested response one level at a time',
    explanation: 'JSON text becomes Python values after decoding. Trace each step separately: object to dictionary, array to list, then a field to a value. A key can exist and still hold null, which Python decodes as None.',
    code: `import json

raw = '{"drafts": [{"subject": "Lesson reminder", "body": null}]}'
response = json.loads(raw)
draft = response["drafts"][0]
print(draft["subject"])
print(draft.get("body", "Missing") is None)`,
    trace: 'The first draft is at index 0. body exists, so get returns None. It uses the default only when the key is missing.',
    quiz: ['What does the final line print?', 'import json\nresponse = json.loads(\'{"drafts": []}\')\ndrafts = response.get("drafts", [])\nprint(drafts[0]["subject"] if drafts else "No draft")', ['KeyError', 'IndexError', 'No draft', 'None'], 2, 'An empty list is false in this condition, so Python uses the second expression without trying index 0.'],
    lab: ['Read a fictional draft inbox', 'Decode each JSON string. Print the first subject when there is a draft, or No draft when the list is empty.',
      'import json\n\ndef first_subject(raw):\n    pass\n\nprint(first_subject(\'{"drafts": [{"subject": "Timetable"}]}\'))\nprint(first_subject(\'{"drafts": []}\'))',
      'Timetable\nNo draft',
      'import json\n\ndef first_subject(raw):\n    drafts = json.loads(raw)["drafts"]\n    if not drafts:\n        return "No draft"\n    return drafts[0]["subject"]\n\nprint(first_subject(\'{"drafts": [{"subject": "Timetable"}]}\'))\nprint(first_subject(\'{"drafts": []}\'))',
      'Decode first. Check that the list contains something before selecting the first dictionary and reading subject.'
    ]
  },
  {
    title: 'Compare models on the same jobs',
    explanation: 'An evaluation is a fair trial on sample jobs you care about. Give each model the same fictional examples and score them with the same checklist. Track crucial errors, editing time, speed and cost separately. A fast model can be ideal for greetings while a slower one saves editing time on IELTS feedback.',
    code: `trials = [
    {"model": "Fast", "passed": True},
    {"model": "Fast", "passed": False},
    {"model": "Careful", "passed": True},
    {"model": "Careful", "passed": True},
]
for model in ("Fast", "Careful"):
    results = [row["passed"] for row in trials if row["model"] == model]
    print(f"{model}: {sum(results)}/{len(results)}")`,
    trace: 'Separate the records by model first. sum counts True as one and False as zero. This tiny example shows the calculation. A real comparison needs more varied cases, including ones you did not use to tune the prompt.',
    quiz: ['Fast gets greetings right but changes the meaning of an IELTS essay. Both models cost within your budget. What is the strongest next comparison?', '', ['Pick Fast for every task', 'Give Careful easier essays', 'Use the models’ confidence scores', 'Give both the same fresh essays and check meaning, accuracy and editing time'], 3, 'Keep the cases and scoring rules the same. Check meaning explicitly so a fluent rewrite does not hide a serious mistake.'],
    lab: ['Count quality checks per model', 'For each model, count passing records and total records. Print the result in the format shown. Both models tried the same two fictional jobs.',
      'trials = [("Fast", True), ("Fast", False),\n          ("Careful", True), ("Careful", True)]\nfor model in ("Fast", "Careful"):\n    # Filter, count and print.\n    pass',
      'Fast: 1/2\nCareful: 2/2',
      'trials = [("Fast", True), ("Fast", False),\n          ("Careful", True), ("Careful", True)]\nfor model in ("Fast", "Careful"):\n    results = [passed for name, passed in trials if name == model]\n    print(f"{model}: {sum(results)}/{len(results)}")',
      'name, passed unpacks each pair. The filter leaves only results for the current model, so both parts of the fraction refer to that model.'
    ]
  },
  {
    title: 'Check a model reply before using it',
    explanation: 'Agree on the shape of a reply first. For a draft, require a non-empty string under draft. Valid JSON can still hold a list, a number or a blank message. Send replies that fail the check to manual review.',
    code: `import json

def accept(raw):
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return "Review"
    if not isinstance(data, dict):
        return "Review"
    draft = data.get("draft")
    return "Ready" if isinstance(draft, str) and draft.strip() else "Review"

print(accept('{"draft": "   "}'))`,
    trace: 'The JSON parses and draft is a string. strip removes spaces at the ends, leaving an empty string. The draft therefore goes to review.',
    quiz: ['What does this print?', 'draft = ["Lesson confirmed"]\nprint("Ready" if isinstance(draft, str) and draft.strip() else "Review")', ['Ready', 'Lesson confirmed', 'AttributeError', 'Review'], 3, 'The list fails the string check. and skips .strip(), which would otherwise fail on a list.'],
    lab: ['Validate three mock AI replies', 'Write the accept function. Return Ready only when the JSON is an object with a non-blank string under draft. Return Review for malformed JSON, other JSON types and missing or invalid drafts.',
      'import json\n\ndef accept(raw):\n    pass\n\nassert accept("[]") == "Review"\nassert accept("{}") == "Review"\nassert accept(\'{"draft": 42}\') == "Review"\nprint(accept(\'{"draft": "See you at 7."}\'))\nprint(accept(\'{"draft": "  "}\'))\nprint(accept("broken"))',
      'Ready\nReview\nReview',
      'import json\n\ndef accept(raw):\n    try:\n        data = json.loads(raw)\n    except json.JSONDecodeError:\n        return "Review"\n    if not isinstance(data, dict):\n        return "Review"\n    draft = data.get("draft")\n    return "Ready" if isinstance(draft, str) and draft.strip() else "Review"\n\nassert accept("[]") == "Review"\nassert accept("{}") == "Review"\nassert accept(\'{"draft": 42}\') == "Review"\nprint(accept(\'{"draft": "See you at 7."}\'))\nprint(accept(\'{"draft": "  "}\'))\nprint(accept("broken"))',
      'Check the container before using .get, then check the draft before using .strip. Ready means the reply has the expected shape. You still need to check its content.'
    ]
  },
  {
    title: 'Follow a bounded fallback',
    explanation: 'A fallback is a backup plan. Decide when to try a second model, and when to stop for human review. A temporary timeout can have a different route from a refusal or a privacy block. This example uses made-up results and makes no network calls.',
    code: `def next_step(first_status, backup_available):
    if first_status == "ok":
        return "Use draft"
    if first_status == "timeout" and backup_available:
        return "Try backup once"
    return "Review"

print(next_step("timeout", True))
print(next_step("blocked", True))`,
    trace: 'Only timeout with a backup reaches the second return. blocked skips it, so the presence of a backup does not undo the block.',
    quiz: ['What happens when both mock models time out?', 'for result in ("timeout", "timeout"):\n    if result == "ok":\n        print("Use draft")\n        break\nelse:\n    print("Review")', ['It tries forever', 'It prints Review once', 'It prints Use draft', 'It prints Review twice'], 1, 'The loop checks each result once. In a for loop, the else block runs if the loop finishes without break.'],
    lab: ['Stop after two model attempts', 'Check at most the first two mock results. Return Draft if you see ok. Continue after timeout. For any other result, or when both attempts fail, return Review.',
      'def handle(results):\n    pass\n\nprint(handle(["timeout", "ok"]))\nprint(handle(["timeout", "timeout", "ok"]))\nprint(handle(["blocked", "ok"]))',
      'Draft\nReview\nReview',
      'def handle(results):\n    for result in results[:2]:\n        if result == "ok":\n            return "Draft"\n        if result != "timeout":\n            return "Review"\n    return "Review"\n\nprint(handle(["timeout", "ok"]))\nprint(handle(["timeout", "timeout", "ok"]))\nprint(handle(["blocked", "ok"]))',
      'The slice limits the loop to two attempts. An early return exits the whole function. The third result never gets used.'
    ]
  },
  {
    title: 'Capstone: read, test and explain a model router',
    explanation: 'A router is code that picks where a job goes. Read the rules in order and trace each input. Choose by what the task needs. For real work, compare models on the same examples and check quality, speed and cost. The labels below stand for fictional models, so the best choice can change when your evidence changes.',
    code: `def route(job):
    if job.get("private", True):
        return "Review"
    kind = job.get("kind")
    if kind == "reminder":
        return "Fast"
    if kind == "IELTS":
        return "Careful"
    if kind == "pronunciation":
        return "Audio"
    return "Review"

print(route({"kind": "pronunciation", "private": False}))
print(route({"kind": "IELTS"}))`,
    trace: 'The first job is marked non-private, so its kind picks Audio. The second job has no privacy field. The default True sends it to Review before the code checks its kind.',
    quiz: ['A pronunciation lesson needs listening to speech. A text-only model is cheaper. How should you choose?', '', ['Pick the cheapest one', 'Choose a model that accepts audio and test it on representative clips', 'Pick whichever model is newest', 'Use a text-only model and ask it to guess the sound'], 1, 'Audio input is a requirement here. Once a model meets it, compare performance on the sounds and accents you teach, plus speed and cost.'],
    lab: ['Build a router for four kinds of tutoring work', 'Implement choose(job). Send jobs to Review if private is true or missing, or if the kind is unknown. For public examples, route reminders to Fast, IELTS feedback to Careful, pronunciation to Audio, and work from worksheet photos to Vision. Keep all seven checks. Before running, explain aloud why the missing-privacy and unknown-kind cases both return Review.',
      'def choose(job):\n    pass\n\nassert choose({"kind": "reminder", "private": False}) == "Fast"\nassert choose({"kind": "IELTS", "private": False}) == "Careful"\nassert choose({"kind": "pronunciation", "private": False}) == "Audio"\nassert choose({"kind": "worksheet photo", "private": False}) == "Vision"\nassert choose({"kind": "reminder", "private": True}) == "Review"\nassert choose({"kind": "IELTS"}) == "Review"\nassert choose({"kind": "unknown", "private": False}) == "Review"\nprint("Seven checks passed")',
      'Seven checks passed',
      'def choose(job):\n    if job.get("private", True):\n        return "Review"\n    routes = {"reminder": "Fast", "IELTS": "Careful",\n              "pronunciation": "Audio", "worksheet photo": "Vision"}\n    return routes.get(job.get("kind"), "Review")\n\nassert choose({"kind": "reminder", "private": False}) == "Fast"\nassert choose({"kind": "IELTS", "private": False}) == "Careful"\nassert choose({"kind": "pronunciation", "private": False}) == "Audio"\nassert choose({"kind": "worksheet photo", "private": False}) == "Vision"\nassert choose({"kind": "reminder", "private": True}) == "Review"\nassert choose({"kind": "IELTS"}) == "Review"\nassert choose({"kind": "unknown", "private": False}) == "Review"\nprint("Seven checks passed")',
      'The first rule returns before the routing table is read. The table keeps job rules together, and its default handles a missing or unfamiliar kind. For a fresh test, add a new job type without revealing the answer, explain the expected result and add a check for it.'
    ]
  }
];
