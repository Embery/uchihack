FROM python:3.7-slim

ENV HOME /project
ENV PYTHONPATH ${HOME}

WORKDIR ${HOME}/

COPY ./requirements.txt ${HOME}/
RUN pip install -r ${HOME}/requirements.txt

COPY . ${HOME}/

CMD ["python", "backend"]