-- FilmRating Insert Rating Trigger
CREATE TRIGGER IF NOT EXISTS after_film_rating_insert
AFTER
INSERT ON FilmRating FOR EACH ROW BEGIN
UPDATE Film
SET voteAverage = (
        SELECT (voteAverage * voteCount + NEW.value) / (voteCount + 1)
        FROM Film
        WHERE id = NEW.filmId
    ),
    voteCount = voteCount + 1
WHERE id = NEW.filmId;
END;
-- FilmRating Update Rating Trigger
CREATE TRIGGER IF NOT EXISTS after_film_rating_update
AFTER
UPDATE ON FilmRating FOR EACH ROW BEGIN
UPDATE Film
SET voteAverage = (
        SELECT (voteAverage * voteCount + NEW.value - OLD.value) / voteCount
        FROM Film
        WHERE id = NEW.filmId
    )
WHERE id = NEW.filmId;
END;
-- FilmRating Delete Rating Trigger
CREATE TRIGGER IF NOT EXISTS after_film_rating_delete
AFTER DELETE ON FilmRating FOR EACH ROW BEGIN
UPDATE Film
SET voteAverage = COALESCE(
        (
            SELECT (voteAverage * voteCount - OLD.value) / (voteCount - 1)
            FROM Film
            WHERE id = OLD.filmId
        ),
        0
    ),
    voteCount = COALESCE(voteCount - 1, 0)
WHERE id = OLD.filmId;
END;