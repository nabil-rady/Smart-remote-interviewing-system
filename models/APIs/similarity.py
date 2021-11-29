from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import math

model_name = 'bert-base-nli-mean-tokens'
model = SentenceTransformer(model_name)

#####################################################
"""Similarity check and return score based on sent"""
#####################################################
def simi(sent):
	sent_vec3 = model.encode(sent)
	x = cosine_similarity(
	    [sent_vec3[0]],
	    sent_vec3[1:]
	)
	y = 0
	for i in range(len(x)):
	    y = y + x[0][i]
	y = (y/(len(sent3) - 1)) * 1000.0
	return math.ceil(y)
