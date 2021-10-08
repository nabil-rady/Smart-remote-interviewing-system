from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import math

sent3 = [
    "I love customer support because I love the constant human interaction and the satisfaction that comes from helping someone solve a problem",
    "solve a problem",
    "customer support"
]

model_name = 'bert-base-nli-mean-tokens'
model = SentenceTransformer(model_name)

sent_vec3 = model.encode(sent3)
x = cosine_similarity(
    [sent_vec3[0]],
    sent_vec3[1:]
)
print(x)
y = 0
for i in range(len(x)):
    y = y + x[0][i]
y = (y/(len(sent3) - 1)) * 1000.0
print(math.ceil(y))
