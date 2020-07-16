class Airline < ApplicationRecord
    has_many :reviews

    before_create :slugify

    def slugify
        self.slug = name.parameterize
    end

    def add_average
        return 0 unless reviews.size.positive?
        
        average = reviews.average(:score).to_f.round(2) * 100
        update_column(:average_score, avg)
    end
end
