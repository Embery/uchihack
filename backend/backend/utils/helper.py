import re
import pymorphy2
from collections import defaultdict


class QuestionTextHandler:

    def __init__(self, stopwords_file: str = "backend/utils/stopwords.txt"):
        self._stopwords = self._get_stopwords(stopwords_file)
        self._morph = pymorphy2.MorphAnalyzer()

    @staticmethod
    def _get_stopwords(stopwords_file):
        with open(stopwords_file) as f:
            stopwords = set(f.read().split("\n"))

        return stopwords

    def get_keywords(self, text):
        text = re.sub(r'[^\w\s]', '', text)

        keywords = []

        for item in text.split(" "):
            if not item or item.isdigit() or (item in self._stopwords):
                continue

            nf = self._morph.parse(item)[0].normal_form
            keywords.append(nf)

        return keywords


class SimilarQuestionHelper:

    def __init__(self):
        self._storage = defaultdict(list)
        self._text_handler = QuestionTextHandler()

    def put(self, idx: int, text: str):
        words = self._text_handler.get_keywords(text)

        for word in words:
            self._storage[word].append(idx)

    def delete(self, idx: int, text: str):
        words = self._text_handler.get_keywords(text)

        for word in words:
            self._storage[word].remove(idx)

    def _get(self, words: list):
        result = []
        for word in words:
            result.append(self._storage[word])

        return result

    def get(self, text: str):
        words = self._text_handler.get_keywords(text)

        w = self._get(words)

        m = defaultdict(int)
        for item in w:
            for idx in item:
                m[idx] += 1

        return [item[0] for item in list(sorted(m.items(), key=lambda i: i[1], reverse=True))]
