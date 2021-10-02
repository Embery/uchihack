class SessionKeeper:

    def __init__(self):
        self._sessions = set()

    def put(self, session_id):
        self._sessions.add(session_id)

    def check(self, session_id):
        return True if session_id in self._sessions else False
